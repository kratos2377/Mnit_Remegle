import { User } from '../entity/User';
import { MiddlewareFn } from 'type-graphql';
import { MyContext } from '../types';

export const isGodAdmin: MiddlewareFn<MyContext> = async (
  { context },
  next
) => {
  const user = await User.findOne({
    where: { id: context.req.session.userId }
  });

  if (!user?.godAdmin) {
    throw new Error('only god can ban user');
  }

  return next();
};
