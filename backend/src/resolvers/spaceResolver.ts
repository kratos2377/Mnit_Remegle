import { Spaces } from '../entity/Spaces';
import { isAuth } from '../middleware/isAuth';
import { MyContext } from '../types';
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
import { Post } from '../entity/Post';
import { User } from '../entity/User';
import { getConnection } from 'typeorm';

@ObjectType()
class FieldSpaceError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class FieldSpaceBoolError {
  @Field()
  value: boolean;

  @Field()
  message: string;
}

@ObjectType()
class SpaceResponse {
  @Field(() => [FieldSpaceError], { nullable: true })
  errors?: FieldSpaceError[];

  @Field(() => FieldSpaceBoolError, { nullable: true })
  boolResult?: FieldSpaceBoolError;

  @Field(() => Spaces, { nullable: true })
  space?: Spaces;
}

@Resolver(Spaces)
export class SpaceResolver {
  @FieldResolver(() => [User])
  async followingIds(@Root() space: Spaces) {
    const spaceAcc = (await Spaces.findOne({
      where: {
        spaceName: space.spaceName
      }
    })) as Spaces;
    const users = (await User.findByIds(
      spaceAcc.followingIds as string[]
    )) as User[];
    return users;
  }
  @FieldResolver(() => [User])
  async bannedUserIds(@Root() space: Spaces) {
    const spaceAcc = (await Spaces.findOne({
      where: {
        spaceName: space.spaceName
      }
    })) as Spaces;
    const users = (await User.findByIds(
      spaceAcc.bannedUserIds as string[]
    )) as User[];
    return users;
  }

  @Query(() => [Spaces], { nullable: true })
  async getSpaces(): Promise<Spaces[] | null> {
    const space = (await Spaces.find()) as Spaces[];

    return space;
  }

  @Query(() => [Spaces], { nullable: true })
  async getAllSpacesofUser(
    @Ctx() { req }: MyContext
  ): Promise<Spaces[] | null> {
    const spaces = (await Spaces.find({
      where: { adminId: req.session.userId }
    })) as Spaces[];

    return spaces;
  }

  @Query(() => [Spaces])
  @UseMiddleware(isAuth)
  async getSpaceByName(
    @Arg('spaceName') spaceName: string
  ): Promise<Spaces[] | null> {
    const space = (await Spaces.find({
      where: { spaceName: spaceName }
    })) as Spaces[];

    return space;
  }

  @Query(() => Spaces)
  @UseMiddleware(isAuth)
  async getSpaceDetails(@Arg('spaceId') spaceId: string): Promise<Spaces> {
    const space = (await Spaces.findOne({
      where: { id: spaceId }
    })) as Spaces;

    return space;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async createSpace(
    @Arg('spaceName') spaceName: string,
    @Arg('spaceDescription') spaceDescription: string,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const user = (await User.findOne({ id: req.session.userId })) as User;

    const space = (await Spaces.findOne({
      where: { spaceName: spaceName }
    })) as Spaces;

    if (space) {
      return false;
    }

    const spaceArr = [user.id];

    const spaceAcc = await Spaces.create({
      spaceName: spaceName,
      spaceDescription: spaceDescription,
      adminId: req.session.userId,
      followingIds: spaceArr
    }).save();

    user.spacesFollowed.push(spaceAcc.id);
    await user.save();
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async followSpace(
    @Arg('spaceId') spaceId: string,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {

    const user = (await User.findOne({
      where: { id: req.session.userId }
    })) as User;

    const space = (await Spaces.findOne({
      where: { id: spaceId }
    })) as Spaces;
    if (req.session.userId !== user.id) {
      return false;
    }

    // if (space.bannedUserIds.includes(studentId)) {
    //   return false;
    // }

    if (!space.followingIds.includes(user.id)) {
      space.followingIds.push(user.id);
      user.spacesFollowed.push(space.id);

      await space.save();
      await user.save();

      return true;
    }

    return false;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async unfollowSpace(
    @Arg('spaceId') spaceId: string,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const user = (await User.findOne({
      where: { id: req.session.userId }
    })) as User;

    const spaceS = (await Spaces.findOne({
      where: { id: spaceId }
    })) as Spaces;

    if (req.session.userId === spaceS.adminId) {
      return false;
    }
    spaceS.followingIds = spaceS.followingIds.filter((id) => id !== user.id);

    user.spacesFollowed = user.spacesFollowed.filter(
      (space) => space !== spaceS.id
    );

    await spaceS.save();
    await user.save();

    return true;
  }

  @Query(() => [Post], { nullable: true })
  async getPostsofSpace(
    @Arg('postSpaceId') postSpaceId: string
  ): Promise<Post[] | null> {
    const posts = (await Post.find({
      where: { postSpaceId: postSpaceId }
    })) as Post[];

    return posts.reverse();
  }

  @Mutation(() => SpaceResponse)
  @UseMiddleware(isAuth)
  async changeSpaceType(
    @Arg('adminId') adminId: string,
    @Arg('spaceName') spaceName: string,
    @Arg('type') type: string,
    @Ctx() { req }: MyContext
  ): Promise<SpaceResponse> {
    if (adminId != req.session.id) {
      return {
        errors: [
          {
            field: 'admin',
            message: 'you are not admin'
          }
        ]
      };
    }

    const result = await getConnection()
      .createQueryBuilder()
      .update(Spaces)
      .set({ type: type })
      .where('spaceName = :spaceName', { spaceName })
      .returning('*')
      .execute();

    return result.raw[0];
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async updateSpaceDetails(
    @Arg("spaceId") spaceId: string,
    @Arg('spaceName') spaceName: string,
    @Arg('spaceDescription') description: string,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const space = (await Spaces.findOne({
      where: { id: spaceId }
    })) as Spaces;

    const space2 = (await Spaces.findOne({
      where: {spaceName: spaceName}
    })) as Spaces;

    if (space.adminId !== req.session.userId) {
      return false;
    }

    if(space2){
      return false;
    }

    await Spaces.update(
      { id: spaceId },
      {
        spaceName : spaceName,
        spaceDescription: description
      }
    );

    return true;
  }

  //Cascade this in entity
  @Mutation(() => SpaceResponse)
  @UseMiddleware(isAuth)
  async deleteSpace(
    @Arg('spaceId') spaceId: string,
    @Ctx() { req }: MyContext
  ): Promise<SpaceResponse> {
    const space = await Spaces.findOne({ where: { spaceId: spaceId } });

    if (!space) {
      return {
        errors: [
          {
            field: 'space',
            message: 'space doesnot exist'
          }
        ]
      };
    }

    if (space.adminId != req.session.userId) {
      return {
        errors: [
          {
            field: 'admin',
            message: 'you are not admin of this space'
          }
        ]
      };
    }

    await Spaces.delete({ id: spaceId });
    await Post.delete({ postSpaceId: spaceId });

    return {
      boolResult: {
        value: true,
        message: 'space deleted'
      }
    };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async removeUserFromSpace(
    @Arg('spaceName') spaceName: string,
    @Arg('idTobeRemoved') idTobeRemoved: string,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const space = (await Spaces.findOne({
      where: { spaceName: spaceName }
    })) as Spaces;

    if (space.adminId !== req.session.userId) {
      return false;
    }

    const user = (await User.findOne({ where: { id: idTobeRemoved } })) as User;

    if (!user) {
      return false;
    }

    space.followingIds = space.followingIds.filter((id) => id !== user.id);
    user.spacesFollowed = user.spacesFollowed.filter(
      (space) => space !== spaceName
    );

    await space.save();
    await user.save();

    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async banUser(
    @Arg('spaceName') spaceName: string,
    @Arg('idTobeBanned') idToBeBanned: string,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const space = (await Spaces.findOne({
      where: { spaceName: spaceName }
    })) as Spaces;
    const user = (await User.findOne({ where: { id: idToBeBanned } })) as User;

    if (space.adminId !== req.session.userId) {
      return false;
    }

    user.spacesFollowed = user.spacesFollowed.filter(
      (space) => space !== spaceName
    );

    space.bannedUserIds = [idToBeBanned, ...space.bannedUserIds];

    await user.save();
    await space.save();

    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async unBanUser(
    @Arg('spaceName') spaceName: string,
    @Arg('idtoUnban') idToUnban: string,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const space = (await Spaces.findOne({
      where: { spaceName: spaceName }
    })) as Spaces;

    if (space.adminId !== req.session.userId) {
      return false;
    }

    space.bannedUserIds = space.bannedUserIds.filter((id) => id !== idToUnban);

    await space.save();

    return true;
  }
}
