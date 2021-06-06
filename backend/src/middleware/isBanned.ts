import { User } from '../entity/User';
import { MiddlewareFn } from 'type-graphql';
import { MyContext } from '../types';

export const isBanned: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const user = await User.findOne({
    where: { id: context.req.session.userId }
  });

  if (!user) {
    throw new Error('not authenticated');
  }

  if (user.isBanned) {
    throw new Error('user banned from using services');
  }

  return next();
};
