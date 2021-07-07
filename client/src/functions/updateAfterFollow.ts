import { ApolloCache } from '@apollo/client';
import { FollowSpaceMutation } from '../generated/graphql';

export const updateAfterFollowSpace = (
  spaceId: string,
  userId: string,
  cache: ApolloCache<FollowSpaceMutation>
) => {};
