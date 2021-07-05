import 'reflect-metadata';
import { createConnection } from 'typeorm';
import Express from 'express';
import { createBuildSchema } from './utils/createSchema';
import { ApolloServer } from 'apollo-server-express';
import session from 'express-session';
import { redis } from './redis';
import connectRedis from 'connect-redis';
import cors from 'cors';
import { createUpdootLoader } from './dataloader/createUpdootLoader';
import { postUserLoader } from './dataloader/postUserLoader';
import { spaceUserLoader } from './dataloader/spaceUserLoader';
//import path from 'path';
import { Post } from './entity/Post';
import { User } from './entity/User';
import { Updoot } from './entity/Updoot';
import { Spaces } from './entity/Spaces';
import { MnitStudent } from './entity/MnitStudent';
import dotenv from 'dotenv';
import { OnlineUser } from './entity/onlineUser';

const main = async () => {
  dotenv.config();

  await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: true,
    entities: [Post, User, Updoot, Spaces, MnitStudent, OnlineUser],
    extra: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  });
  const app = Express();

  const RedisStore = connectRedis(session);
  app.set('trust proxy', 1);
  const schema = await createBuildSchema();

  app.use(
    cors({
      origin: [
        'http://localhost:19006',
        'http://10.0.2.2:19000',
        'https://remegle-web.netlify.app'
      ],
      credentials: true
    })
  );

  app.use(
    session({
      store: new RedisStore({
        client: redis as any,
        disableTouch: true
      }),
      name: 'qid',
      secret: 'aslkdfjoiq12312',
      resave: false,
      saveUninitialized: false,
      cookie: {
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 90 // 90 Days
      }
    })
  );

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({
      req,
      res,
      redis,
      spaceUserLoader: spaceUserLoader(),
      userLoader: postUserLoader(),
      updootLoader: createUpdootLoader()
    })
  });

  apolloServer.applyMiddleware({ app, cors: false });
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log('SERVER STARTED AT PORT ' + port));
};

main().catch((err) => {
  console.log(err);
});
