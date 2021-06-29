import { ApolloCache } from '@apollo/client';
import gql from 'graphql-tag';
import { UpdateSpaceAvatarUrlMutation } from '../generated/graphql';

export const updateAfterSpaceAvatar = (
  spaceId: string,
  url: string,
  cache: ApolloCache<UpdateSpaceAvatarUrlMutation>
) => {
  const data = cache.readFragment<{
    spaceId: string;
    url: string;
  }>({
    id: 'Spaces:' + spaceId,
    fragment: gql`
      fragment _ on Spaces {
        id
        spaceAvatarUrl
      }
    `
  });

  cache.writeFragment({
    id: 'Spaces:' + spaceId,
    fragment: gql`
      fragment __ on Spaces {
        spaceAvatarUrl
      }
    `,
    data: { spaceAvatarUrl: url }
  });
};
