import { ApolloCache } from '@apollo/client';
import { UnFollowSpaceMutation } from '../generated/graphql';
import gql from 'graphql-tag';

export const updateAfterUnfollowSpace = (
  spaceId: string,
  userId: string,
  cache: ApolloCache<UnFollowSpaceMutation>
) => {
  const data = cache.readFragment<{
    spaceId: string;
    adminId: string;
    followingIds: string[];
  }>({
    id: 'Spaces:' + spaceId,
    fragment: gql`
      fragment _ on Spaces {
        id
        adminId
        followingIds
      }
    `
  });

  console.log('Space Data');
  console.log(data);

  // cache.writeFragment({
  //   id: "Spaces:" + spaceId,
  //   fragment: gql`
  //     fragment __ on Spaces {
  //       points
  //       voteStatus
  //     }
  //   `,
  // });
};
