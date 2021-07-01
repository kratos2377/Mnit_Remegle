import { v4 } from 'uuid';
import { redis } from '../redis';
import { forgotPasswordPrefix } from '../redisPrefixes';
import dotenv from 'dotenv';

export const createPasswordChangeUrl = async (userId: string) => {
  dotenv.config();
  const token = v4();
  await redis.set(forgotPasswordPrefix + token, userId, 'ex', 60 * 60); // 1 hour expiration

  return `${process.env.WEB_FRONTEND}/user/change-password/${token}`;
};
