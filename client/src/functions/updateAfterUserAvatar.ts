import { ApolloCache } from '@apollo/client';
import { UpdateAvatarUrlMutation } from '../generated/graphql';
import gql from 'graphql-tag';

export const updateAfterUserAvatar = (
  userId: string,
  url: string,
  cache: ApolloCache<UpdateAvatarUrlMutation>
) => {
  const data = cache.readFragment<{
    userId: string;
    url: string;
  }>({
    id: 'User:' + userId,
    fragment: gql`
      fragment _ on User {
        id
        avatarUrl
      }
    `
  });
  console.log(data);
  cache.writeFragment({
    id: 'User:' + userId,
    fragment: gql`
      fragment __ on User {
        avatarUrl
      }
    `,
    data: { avatarUrl: url }
  });
};
