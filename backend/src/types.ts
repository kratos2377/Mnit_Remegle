import { Request, Response } from 'express';
import { Session, SessionData } from 'express-session';
import { Redis } from 'ioredis';
import { createUpdootLoader } from './dataloader/createUpdootLoader';
import { postUserLoader } from './dataloader/postUserLoader';
import { spaceUserLoader } from './dataloader/spaceUserLoader';

export type MyContext = {
  req: Request & {
    session: Session & Partial<SessionData> & { userId: string };
  };
  redis: Redis;
  res: Response;
  userLoader: ReturnType<typeof postUserLoader>;
  spaceUserLoader: ReturnType<typeof spaceUserLoader>;
  updootLoader: ReturnType<typeof createUpdootLoader>;
};
