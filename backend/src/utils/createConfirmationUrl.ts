import { v4 } from 'uuid';
import { redis } from '../redis';
import { confirmUserPrefix } from '../redisPrefixes';
import dotenv from 'dotenv';

export const createConfirmationUrl = async (userId: string) => {
  dotenv.config();
  const token = v4();
  await redis.set(confirmUserPrefix + token, userId, 'ex', 60 * 60 * 24); // 1 hour expiration

  return `${process.env.WEB_FRONTEND}/user/confirm/${token}`;
};
