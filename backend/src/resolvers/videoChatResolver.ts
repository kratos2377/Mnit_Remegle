import { OnlineUser } from '../entity/onlineUser';
import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { isAuth } from '../middleware/isAuth';
import { onlineUserInput } from '../inputType/onlineUserInput';
import { MyContext } from '../types';

@Resolver(OnlineUser)
export class VideoChatResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async userEntry(
    @Arg('data')
    { id, studentId, name, gender, username, avatarUrl }: onlineUserInput,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    if (id !== req.session.userId) {
      return false;
    }

    if (!id || !studentId || !name || !gender || !username || !avatarUrl) {
      return false;
    }

    await OnlineUser.create({
      id: id,
      studentId: studentId,
      name: name,
      gender: gender,
      username: username,
      avatarUrl: avatarUrl
    }).save();

    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async userExit(
    @Arg('id') id: string,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    if (id !== req.session.userId) {
      return false;
    }

    if (!id) {
      return false;
    }

    await OnlineUser.delete({ id: id });

    return true;
  }
}
