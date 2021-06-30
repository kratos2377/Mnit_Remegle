import 'reflect-metadata';
import { createConnection, getConnectionOptions } from 'typeorm';
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

const main = async () => {
  await getConnectionOptions();
  const app = Express();
  const schema = await createBuildSchema();

  const RedisStore = connectRedis(session);

  app.use(
    session({
      store: new RedisStore({
        client: redis,
        disableTouch: true
      }),
      name: 'qid',
      secret: 'aslkdfjoiq12312',
      resave: false,
      saveUninitialized: false,
      cookie: {
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

  app.use(
    cors({
      origin: [
        'http://localhost:19006',
        'http://10.0.2.2:19000',
        'http://localhost:3000'
      ],
      credentials: true
    })
  );

  apolloServer.applyMiddleware({ app, cors: false });
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log('SERVER STARTED AT PORT 5000'));
  await createConnection();
};

main().catch((err) => {
  console.log(err);
});
