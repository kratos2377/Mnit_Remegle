import { v4 } from 'uuid';
import { redis } from '../redis';
import { forgotPasswordPrefix } from '../redisPrefixes';

export const createPasswordChangeUrl = async (userId: string) => {
  const token = v4();
  await redis.set(forgotPasswordPrefix + token, userId, 'ex', 60 * 60); // 1 hour expiration

  return `http://localhost:3000/user/change-password/${token}`;
};
