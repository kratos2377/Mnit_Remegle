import { PostResolver } from '../resolvers/postResolver';
import { SpaceResolver } from '../resolvers/spaceResolver';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from '../resolvers/helloResolver';
import { UserResolver } from '../resolvers/userResolver';
import { SearchResolver } from '../resolvers/searchResolver';
import { VideoChatResolver } from '../resolvers/videoChatResolver';

export const createBuildSchema = () =>
  buildSchema({
    resolvers: [
      HelloResolver,
      UserResolver,
      PostResolver,
      SpaceResolver,
      SearchResolver,
      VideoChatResolver
    ],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    }
  });
