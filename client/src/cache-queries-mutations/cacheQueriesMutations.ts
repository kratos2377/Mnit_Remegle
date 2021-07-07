import gql from 'graphql-tag';
export const GET_SPACE_DETAILS = gql`
  query GetSpaceDetails($spaceId: String!) {
    getSpaceDetails(spaceId: $spaceId) {
      id
      adminId
      type
      spaceName
      spaceAvatarUrl
      spaceDescription
      bannedUserIds {
        id
      }
      followingIds {
        id
        fullName
        username
        avatarUrl
        studentId
      }
    }
  }
`;
