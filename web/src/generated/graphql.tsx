import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};


export type FieldBoolError = {
  __typename?: 'FieldBoolError';
  value: Scalars['Boolean'];
  message: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type FieldSpaceBoolError = {
  __typename?: 'FieldSpaceBoolError';
  value: Scalars['Boolean'];
  message: Scalars['String'];
};

export type FieldSpaceError = {
  __typename?: 'FieldSpaceError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  vote: Scalars['Boolean'];
  createPosts?: Maybe<Post>;
  updatePost?: Maybe<Post>;
  deletePost: Scalars['Boolean'];
  godDeletePost: Scalars['Boolean'];
  createSpace: Scalars['Boolean'];
  followSpace: Scalars['Boolean'];
  unfollowSpace: Scalars['Boolean'];
  changeSpaceType: SpaceResponse;
  changeDescription: Scalars['Boolean'];
  deleteSpace: SpaceResponse;
  removeUserFromSpace: Scalars['Boolean'];
  banUser: Scalars['Boolean'];
  unBanUser: Scalars['Boolean'];
  confirmTheUser: Scalars['Boolean'];
  confirmUserCheck: UserResponse;
  sendConfirmationMail: Scalars['Boolean'];
  registerUser: UserResponse;
  login: UserResponse;
  usernameUsers: User;
  updateUserDetails: UserResponse;
  generateforgotPasswordUrl: Scalars['Boolean'];
  changeForgotPassword: Scalars['Boolean'];
  forgotPassword: UserResponse;
  deleteUser: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  searchQuery?: Maybe<UserandSpaces>;
};


export type MutationVoteArgs = {
  value: Scalars['Int'];
  postId: Scalars['String'];
};


export type MutationCreatePostsArgs = {
  spaceName: Scalars['String'];
  content: Scalars['String'];
  title: Scalars['String'];
};


export type MutationUpdatePostArgs = {
  content: Scalars['String'];
  title: Scalars['String'];
  postId: Scalars['String'];
};


export type MutationDeletePostArgs = {
  postId: Scalars['String'];
};


export type MutationGodDeletePostArgs = {
  postId: Scalars['String'];
};


export type MutationCreateSpaceArgs = {
  spaceDescription: Scalars['String'];
  spaceName: Scalars['String'];
};


export type MutationFollowSpaceArgs = {
  spaceId: Scalars['String'];
};


export type MutationUnfollowSpaceArgs = {
  spaceId: Scalars['String'];
};


export type MutationChangeSpaceTypeArgs = {
  type: Scalars['String'];
  spaceName: Scalars['String'];
  adminId: Scalars['String'];
};


export type MutationChangeDescriptionArgs = {
  description: Scalars['String'];
  spaceName: Scalars['String'];
};


export type MutationDeleteSpaceArgs = {
  spaceId: Scalars['String'];
};


export type MutationRemoveUserFromSpaceArgs = {
  idTobeRemoved: Scalars['String'];
  spaceName: Scalars['String'];
};


export type MutationBanUserArgs = {
  studentId: Scalars['String'];
};


export type MutationUnBanUserArgs = {
  idtoUnban: Scalars['String'];
  spaceName: Scalars['String'];
};


export type MutationConfirmTheUserArgs = {
  token: Scalars['String'];
};


export type MutationConfirmUserCheckArgs = {
  studentId: Scalars['String'];
};


export type MutationSendConfirmationMailArgs = {
  studentId: Scalars['String'];
};


export type MutationRegisterUserArgs = {
  data: RegisterInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationUsernameUsersArgs = {
  username: Scalars['String'];
};


export type MutationUpdateUserDetailsArgs = {
  instagramAcc: Scalars['String'];
  twitterAcc: Scalars['String'];
  bio: Scalars['String'];
  username: Scalars['String'];
};


export type MutationGenerateforgotPasswordUrlArgs = {
  id: Scalars['String'];
};


export type MutationChangeForgotPasswordArgs = {
  confirmnewPassword: Scalars['String'];
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  newPassword: Scalars['String'];
  currentPassword: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  studentId: Scalars['String'];
};


export type MutationSearchQueryArgs = {
  searchName: Scalars['String'];
};

export type PaginatedPosts = {
  __typename?: 'PaginatedPosts';
  posts: Array<Post>;
  hasMore: Scalars['Boolean'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['String'];
  creatorId: Scalars['String'];
  points: Scalars['Float'];
  title: Scalars['String'];
  content: Scalars['String'];
  postSpaceId: Scalars['String'];
  voteStatus?: Maybe<Scalars['Int']>;
  spaceName: Scalars['String'];
  imageUrl: Scalars['String'];
  creator: User;
  space: Spaces;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  textSnippet: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getPostsById: Post;
  getAllPosts?: Maybe<Array<Post>>;
  getFeedPosts: PaginatedPosts;
  getPostsByUserId?: Maybe<Array<Post>>;
  checkifUserFollowSpace: Array<Post>;
  getAllUserPosts?: Maybe<Array<Post>>;
  getSpaces?: Maybe<Array<Spaces>>;
  getAllSpacesofUser?: Maybe<Array<Spaces>>;
  getSpaceByName: Array<Spaces>;
  getSpaceDetails: Spaces;
  getPostsofSpace?: Maybe<Array<Post>>;
  hello: Scalars['String'];
  me?: Maybe<User>;
  studentDetails?: Maybe<User>;
};


export type QueryGetPostsByIdArgs = {
  postId: Scalars['String'];
};


export type QueryGetFeedPostsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryGetPostsByUserIdArgs = {
  id: Scalars['String'];
};


export type QueryCheckifUserFollowSpaceArgs = {
  spaceName: Scalars['String'];
};


export type QueryGetSpaceByNameArgs = {
  spaceName: Scalars['String'];
};


export type QueryGetSpaceDetailsArgs = {
  spaceId: Scalars['String'];
};


export type QueryGetPostsofSpaceArgs = {
  postSpaceId: Scalars['String'];
};


export type QueryStudentDetailsArgs = {
  id: Scalars['String'];
};

export type RegisterInput = {
  studentId: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
  gender: Scalars['String'];
  email: Scalars['String'];
};

export type SpaceResponse = {
  __typename?: 'SpaceResponse';
  errors?: Maybe<Array<FieldSpaceError>>;
  boolResult?: Maybe<FieldSpaceBoolError>;
  space?: Maybe<Spaces>;
};

export type Spaces = {
  __typename?: 'Spaces';
  spaceId: Scalars['String'];
  adminId: Scalars['String'];
  type: Scalars['String'];
  spaceName: Scalars['String'];
  spaceDescription: Scalars['String'];
  spaceAvatarUrl: Scalars['String'];
  followingIds: Array<User>;
  bannedUserIds: Array<User>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  studentId: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  fullName: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  gender: Scalars['String'];
  godAdmin: Scalars['Boolean'];
  isConfirmed: Scalars['Boolean'];
  password: Scalars['String'];
  avatarUrl: Scalars['String'];
  isBanned: Scalars['Boolean'];
  striked: Scalars['Float'];
  bio: Scalars['String'];
  instagramAcc: Scalars['String'];
  twitterAcc: Scalars['String'];
  spaces: Array<Spaces>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  boolResult?: Maybe<FieldBoolError>;
  user?: Maybe<User>;
  sessionId?: Maybe<Scalars['String']>;
};

export type UserandSpaces = {
  __typename?: 'UserandSpaces';
  users?: Maybe<Array<User>>;
  spaces?: Maybe<Array<Spaces>>;
};

export type ChangeForgotPasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
  confirmnewPassword: Scalars['String'];
}>;


export type ChangeForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'changeForgotPassword'>
);

export type ConfirmUserMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type ConfirmUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'confirmTheUser'>
);


export const ChangeForgotPasswordDocument = gql`
    mutation ChangeForgotPassword($token: String!, $newPassword: String!, $confirmnewPassword: String!) {
  changeForgotPassword(
    token: $token
    newPassword: $newPassword
    confirmnewPassword: $confirmnewPassword
  )
}
    `;
export type ChangeForgotPasswordMutationFn = Apollo.MutationFunction<ChangeForgotPasswordMutation, ChangeForgotPasswordMutationVariables>;

/**
 * __useChangeForgotPasswordMutation__
 *
 * To run a mutation, you first call `useChangeForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeForgotPasswordMutation, { data, loading, error }] = useChangeForgotPasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *      confirmnewPassword: // value for 'confirmnewPassword'
 *   },
 * });
 */
export function useChangeForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangeForgotPasswordMutation, ChangeForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeForgotPasswordMutation, ChangeForgotPasswordMutationVariables>(ChangeForgotPasswordDocument, options);
      }
export type ChangeForgotPasswordMutationHookResult = ReturnType<typeof useChangeForgotPasswordMutation>;
export type ChangeForgotPasswordMutationResult = Apollo.MutationResult<ChangeForgotPasswordMutation>;
export type ChangeForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ChangeForgotPasswordMutation, ChangeForgotPasswordMutationVariables>;
export const ConfirmUserDocument = gql`
    mutation ConfirmUser($token: String!) {
  confirmTheUser(token: $token)
}
    `;
export type ConfirmUserMutationFn = Apollo.MutationFunction<ConfirmUserMutation, ConfirmUserMutationVariables>;

/**
 * __useConfirmUserMutation__
 *
 * To run a mutation, you first call `useConfirmUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmUserMutation, { data, loading, error }] = useConfirmUserMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useConfirmUserMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmUserMutation, ConfirmUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmUserMutation, ConfirmUserMutationVariables>(ConfirmUserDocument, options);
      }
export type ConfirmUserMutationHookResult = ReturnType<typeof useConfirmUserMutation>;
export type ConfirmUserMutationResult = Apollo.MutationResult<ConfirmUserMutation>;
export type ConfirmUserMutationOptions = Apollo.BaseMutationOptions<ConfirmUserMutation, ConfirmUserMutationVariables>;