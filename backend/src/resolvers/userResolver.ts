import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware
} from 'type-graphql';
import { User } from '../entity/User';
import { RegisterInput } from '../inputType/registerInput';
import argon2 from 'argon2';
import { MnitStudent } from '../entity/MnitStudent';
import { redis } from '../redis';
import { confirmUserPrefix } from '../redisPrefixes';
import { sendEmail } from '../utils/sendEmail';
import { createConfirmationUrl } from '../utils/createConfirmationUrl';
import { createPasswordChangeUrl } from '../utils/forgotPasswordEmail';
import { MyContext } from '../types';
import { isAuth } from '../middleware/isAuth';
import { isGodAdmin } from '../middleware/isGodAdmin';
import { COOKIE_NAME } from '../constants';
import { Spaces } from '../entity/Spaces';

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class FieldBoolError {
  @Field()
  value: boolean;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => FieldBoolError, { nullable: true })
  boolResult?: FieldBoolError;

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => String, { nullable: true })
  sessionId?: string;
}

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => [Spaces])
  async spaces(@Root() user: User) {
    const userAcc = (await User.findOne({ where: { id: user.id } })) as User;
    const userSpaces = (await Spaces.findByIds(
      userAcc.spacesFollowed as string[]
    )) as Spaces[];

    return userSpaces;
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext): Promise<User | null> {
    if (!req.session.userId) {
      return null;
    }

    const user = (await User.findOne({
      where: { id: req.session.userId }
    })) as User;

    return user;
  }

  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  async studentDetails(@Arg('id') id: string): Promise<User | null> {
    const user = await User.findOne({ where: { id: id } });
    console.log(user);

    if (!user) {
      return null;
    }

    return user;
  }

  @Mutation(() => Boolean)
  async confirmTheUser(@Arg('token') token: string): Promise<boolean> {
    const userId = await redis.get(confirmUserPrefix + token);

    if (!userId) {
      return false;
    }

    await MnitStudent.update({ studentId: userId }, { isConfirmed: true });
    await redis.del(token);

    return true;
  }

  @Mutation(() => UserResponse)
  async confirmUserCheck(
    @Arg('studentId') studentId: string
  ): Promise<UserResponse> {
    studentId = studentId.toLowerCase();

    const valid = await MnitStudent.findOne({
      where: { studentId: studentId }
    });

    const user = (await User.findOne({
      where: { studentId: studentId }
    })) as User;

    if (user) {
      return {
        boolResult: {
          value: false,
          message: 'user already registered'
        }
      };
    }

    if (!valid) {
      return {
        boolResult: {
          value: false,
          message: 'user doesnt exist'
        }
      };
    } else {
      if (valid.isConfirmed) {
        return {
          boolResult: {
            value: true,
            message: 'user verified'
          }
        };
      } else {
        return {
          boolResult: {
            value: false,
            message: 'user not verified'
          }
        };
      }
    }
  }

  @Mutation(() => Boolean)
  async sendConfirmationMail(
    @Arg('studentId') studentId: string
  ): Promise<Boolean> {
    const mnitkaBacha = await MnitStudent.findOne({
      where: { studentId: studentId }
    });

    if (!mnitkaBacha) {
      await MnitStudent.create({
        studentId: studentId.toLowerCase()
      }).save();
    }

    let studentLow = studentId.toLowerCase();

    studentLow += '@mnit.ac.in';

    await sendEmail(
      studentLow,
      await createConfirmationUrl(studentId.toLowerCase())
    );
    return true;
  }

  @Mutation(() => UserResponse)
  async registerUser(
    @Arg('data')
    {
      studentId,
      firstName,
      lastName,
      email,
      password,
      gender,
      username
    }: RegisterInput,

    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    studentId = studentId.toLowerCase();
    const valid = await MnitStudent.findOne({
      where: { studentId: studentId }
    });

    if (!valid) {
      return {
        boolResult: {
          value: false,
          message: 'user doesnot exist'
        }
      };
    }

    if (!valid.isConfirmed) {
      return {
        boolResult: {
          value: false,
          message: 'user not verified'
        }
      };
    }

    const hashedPassword = await argon2.hash(password);
    let user;

    user = await User.create({
      studentId: studentId.toLowerCase(),
      firstName: firstName,
      lastName: lastName,
      username: username,
      godAdmin: studentId.toLowerCase() == '2019ucp1403' ? true : false,
      gender: gender,
      email: email,
      password: hashedPassword
    }).save();

    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('usernameOrEmail') usernameOrEmail: string,
    @Arg('password') password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    console.log(usernameOrEmail);
    console.log(password);
    const user = await User.findOne(
      usernameOrEmail.includes('@')
        ? { where: { email: usernameOrEmail } }
        : { where: { username: usernameOrEmail } }
    );

    if (!user) {
      return {
        errors: [
          {
            field: 'user',
            message: 'user not found'
          }
        ]
      };
    }

    const valid = await argon2.verify(user.password, password);

    if (!valid) {
      return {
        errors: [
          {
            field: 'password',
            message: 'password not correct'
          }
        ]
      };
    }

    req.session.userId = user.id;

    if (req.sessionID) {
      await redis.lpush(`${user.id}`, req.sessionID);
    }
    return { user, sessionId: req.sessionID };
  }

  @Mutation(() => User)
  async usernameUsers(@Arg('username') username: string): Promise<User> {
    const user = (await User.findOne({ username })) as User;

    return user;
  }

  @Mutation(() => UserResponse)
  @UseMiddleware(isAuth)
  async updateUserDetails(
    @Arg('username') username: string,
    @Arg('bio') bio: string,
    @Arg('twitterAcc') twitterAcc: string,
    @Arg('instagramAcc') instagramAcc: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = (await User.find({ username })) as User[];

    if (user.length !== 0) {
      if (user[0].id !== req.session.userId) {
        return {
          boolResult: {
            value: false,
            message: 'username in use'
          }
        };
      }
    }

    await User.update(
      { id: req.session.userId },
      {
        username: username,
        bio: bio,
        twitterAcc: twitterAcc,
        instagramAcc: instagramAcc
      }
    );

    return {
      boolResult: {
        value: true,
        message: 'updated'
      }
    };
  }

  @Mutation(() => Boolean)
  async generateforgotPasswordUrl(
    @Arg('studentId') studentId: string
  ): Promise<Boolean> {
    studentId = studentId.toLowerCase();

    let studentEmail = studentId + '@mnit.ac.in';

    await sendEmail(studentEmail, await createPasswordChangeUrl(studentId));

    return true;
  }

  @Mutation(() => Boolean)
  async changeForgotPassword(
    @Arg('token') token: string,
    @Arg('newPassword') newPassword: string,
    @Arg('confirmnewPassword') confirmnewPassword: string
  ): Promise<Boolean> {
    if (newPassword !== confirmnewPassword) {
      return false;
    }

    const userId = await redis.get(confirmUserPrefix + token);

    if (!userId) {
      return false;
    }

    const hashedPassword = await argon2.hash(newPassword);

    await User.update({ studentId: userId }, { password: hashedPassword });
    await redis.del(token);

    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async doesUsernameExist(
    @Arg('username') username: string,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const user = (await User.findOne({
      where: { username: username }
    })) as User;

    if (!user) {
      return true;
    }

    if (user.id === req.session.userId) {
      return true;
    }

    return false;
  }

  @Mutation(() => UserResponse)
  @UseMiddleware(isAuth)
  async forgotPassword(
    @Arg('currentPassword') currentPassword: string,
    @Arg('newPassword') newPassword: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = (await User.findOne({
      where: { id: req.session.userId }
    })) as User;

    const valid = await argon2.verify(user.password, currentPassword);

    if (!valid) {
      return {
        errors: [
          {
            field: 'password',
            message: 'password not correct'
          }
        ]
      };
    }

    const hashedPassword = await argon2.hash(newPassword);

    await User.update({ id: req.session.userId }, { password: hashedPassword });

    return {
      errors: [
        {
          field: 'password',
          message: 'password changed'
        }
      ]
    };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteUser(
    @Arg('studentId') studentId: string,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const user = (await User.findOne({
      where: { studentId: studentId }
    })) as User;
    if (user.id !== req.session.userId) {
      return false;
    }

    await User.delete({ studentId: studentId });

    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  @UseMiddleware(isGodAdmin)
  async banUser(@Arg('studentId') studentId: string): Promise<boolean> {
    await User.update(
      { studentId: studentId },
      {
        isBanned: true
      }
    );

    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }

        resolve(true);
      })
    );
  }
}
