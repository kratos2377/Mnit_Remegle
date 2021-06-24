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
  postId: Scalars['String'];
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

export type PostSnippetFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'postId' | 'creatorId' | 'points' | 'voteStatus' | 'postSpaceId' | 'title' | 'content' | 'createdAt' | 'spaceName'>
  & { creator: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'avatarUrl' | 'studentId' | 'fullName' | 'username'>
  ) }
);

export type RegularBoolErrorFragment = (
  { __typename?: 'FieldBoolError' }
  & Pick<FieldBoolError, 'value' | 'message'>
);

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularSpaceFragment = (
  { __typename?: 'Spaces' }
  & Pick<Spaces, 'spaceId' | 'adminId' | 'type' | 'spaceName' | 'spaceAvatarUrl' | 'spaceDescription'>
);

export type RegularSpaceBoolErrorFragment = (
  { __typename?: 'FieldSpaceBoolError' }
  & Pick<FieldSpaceBoolError, 'value' | 'message'>
);

export type RegularSpaceErrorFragment = (
  { __typename?: 'FieldSpaceError' }
  & Pick<FieldSpaceError, 'field' | 'message'>
);

export type RegularSpaceResponseFragment = (
  { __typename?: 'SpaceResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldSpaceError' }
    & RegularSpaceErrorFragment
  )>>, boolResult?: Maybe<(
    { __typename?: 'FieldSpaceBoolError' }
    & RegularSpaceBoolErrorFragment
  )>, space?: Maybe<(
    { __typename?: 'Spaces' }
    & RegularSpaceFragment
  )> }
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'fullName' | 'email' | 'studentId' | 'gender' | 'godAdmin' | 'avatarUrl' | 'instagramAcc' | 'twitterAcc' | 'isBanned' | 'bio'>
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>>, boolResult?: Maybe<(
    { __typename?: 'FieldBoolError' }
    & RegularBoolErrorFragment
  )>, user?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type UserAndSpacesResponseFragment = (
  { __typename?: 'UserandSpaces' }
  & { users?: Maybe<Array<(
    { __typename?: 'User' }
    & RegularUserFragment
  )>>, spaces?: Maybe<Array<(
    { __typename?: 'Spaces' }
    & RegularSpaceFragment
  )>> }
);

export type ConfirmUserCheckMutationVariables = Exact<{
  studentId: Scalars['String'];
}>;


export type ConfirmUserCheckMutation = (
  { __typename?: 'Mutation' }
  & { confirmUserCheck: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type CreatePostsMutationVariables = Exact<{
  title: Scalars['String'];
  content: Scalars['String'];
  spaceName: Scalars['String'];
}>;


export type CreatePostsMutation = (
  { __typename?: 'Mutation' }
  & { createPosts?: Maybe<(
    { __typename?: 'Post' }
    & PostSnippetFragment
  )> }
);

export type CreateSpaceMutationVariables = Exact<{
  spaceName: Scalars['String'];
  spaceDescription: Scalars['String'];
}>;


export type CreateSpaceMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createSpace'>
);

export type DeletePostMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePost'>
);

export type DeleteSpaceMutationVariables = Exact<{
  spaceId: Scalars['String'];
}>;


export type DeleteSpaceMutation = (
  { __typename?: 'Mutation' }
  & { deleteSpace: (
    { __typename?: 'SpaceResponse' }
    & RegularSpaceResponseFragment
  ) }
);

export type FollowSpaceMutationVariables = Exact<{
  spaceId: Scalars['String'];
}>;


export type FollowSpaceMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'followSpace'>
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  data: RegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { registerUser: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type SearchQueryMutationVariables = Exact<{
  searchName: Scalars['String'];
}>;


export type SearchQueryMutation = (
  { __typename?: 'Mutation' }
  & { searchQuery?: Maybe<(
    { __typename?: 'UserandSpaces' }
    & UserAndSpacesResponseFragment
  )> }
);

export type SendConfirmationMailMutationVariables = Exact<{
  studentId: Scalars['String'];
}>;


export type SendConfirmationMailMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'sendConfirmationMail'>
);

export type UnFollowSpaceMutationVariables = Exact<{
  spaceId: Scalars['String'];
}>;


export type UnFollowSpaceMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'unfollowSpace'>
);

export type UpdatePostMutationVariables = Exact<{
  postId: Scalars['String'];
  title: Scalars['String'];
  content: Scalars['String'];
}>;


export type UpdatePostMutation = (
  { __typename?: 'Mutation' }
  & { updatePost?: Maybe<(
    { __typename?: 'Post' }
    & PostSnippetFragment
  )> }
);

export type UpdateUserMutationVariables = Exact<{
  username: Scalars['String'];
  bio: Scalars['String'];
  twitterAcc: Scalars['String'];
  instagramAcc: Scalars['String'];
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUserDetails: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type VoteMutationVariables = Exact<{
  value: Scalars['Int'];
  postId: Scalars['String'];
}>;


export type VoteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'vote'>
);

export type GetAllSpacesByUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllSpacesByUserQuery = (
  { __typename?: 'Query' }
  & { getAllSpacesofUser?: Maybe<Array<(
    { __typename?: 'Spaces' }
    & RegularSpaceFragment
  )>> }
);

export type GetAllUserPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUserPostsQuery = (
  { __typename?: 'Query' }
  & { getAllUserPosts?: Maybe<Array<(
    { __typename?: 'Post' }
    & PostSnippetFragment
  )>> }
);

export type GetFeedPostsQueryVariables = Exact<{
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
}>;


export type GetFeedPostsQuery = (
  { __typename?: 'Query' }
  & { getFeedPosts: (
    { __typename?: 'PaginatedPosts' }
    & Pick<PaginatedPosts, 'hasMore'>
    & { posts: Array<(
      { __typename?: 'Post' }
      & PostSnippetFragment
    )> }
  ) }
);

export type GetPostsOfSpacesQueryVariables = Exact<{
  postSpaceId: Scalars['String'];
}>;


export type GetPostsOfSpacesQuery = (
  { __typename?: 'Query' }
  & { getPostsofSpace?: Maybe<Array<(
    { __typename?: 'Post' }
    & PostSnippetFragment
  )>> }
);

export type GetPostsByUserIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetPostsByUserIdQuery = (
  { __typename?: 'Query' }
  & { getPostsByUserId?: Maybe<Array<(
    { __typename?: 'Post' }
    & PostSnippetFragment
  )>> }
);

export type GetSpaceDetailsQueryVariables = Exact<{
  spaceId: Scalars['String'];
}>;


export type GetSpaceDetailsQuery = (
  { __typename?: 'Query' }
  & { getSpaceDetails: (
    { __typename?: 'Spaces' }
    & Pick<Spaces, 'spaceId' | 'adminId' | 'type' | 'spaceName' | 'spaceAvatarUrl' | 'spaceDescription'>
    & { bannedUserIds: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
    )>, followingIds: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'fullName' | 'username' | 'avatarUrl' | 'studentId'>
    )> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type StudentDetailsQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type StudentDetailsQuery = (
  { __typename?: 'Query' }
  & { studentDetails?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export const PostSnippetFragmentDoc = gql`
    fragment PostSnippet on Post {
  postId
  creatorId
  points
  voteStatus
  postSpaceId
  title
  content
  createdAt
  spaceName
  creator {
    id
    avatarUrl
    studentId
    fullName
    username
  }
}
    `;
export const RegularSpaceErrorFragmentDoc = gql`
    fragment RegularSpaceError on FieldSpaceError {
  field
  message
}
    `;
export const RegularSpaceBoolErrorFragmentDoc = gql`
    fragment RegularSpaceBoolError on FieldSpaceBoolError {
  value
  message
}
    `;
export const RegularSpaceFragmentDoc = gql`
    fragment RegularSpace on Spaces {
  spaceId
  adminId
  type
  spaceName
  spaceAvatarUrl
  spaceDescription
}
    `;
export const RegularSpaceResponseFragmentDoc = gql`
    fragment RegularSpaceResponse on SpaceResponse {
  errors {
    ...RegularSpaceError
  }
  boolResult {
    ...RegularSpaceBoolError
  }
  space {
    ...RegularSpace
  }
}
    ${RegularSpaceErrorFragmentDoc}
${RegularSpaceBoolErrorFragmentDoc}
${RegularSpaceFragmentDoc}`;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularBoolErrorFragmentDoc = gql`
    fragment RegularBoolError on FieldBoolError {
  value
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
  fullName
  email
  studentId
  gender
  godAdmin
  avatarUrl
  instagramAcc
  twitterAcc
  isBanned
  bio
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  boolResult {
    ...RegularBoolError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularBoolErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const UserAndSpacesResponseFragmentDoc = gql`
    fragment UserAndSpacesResponse on UserandSpaces {
  users {
    ...RegularUser
  }
  spaces {
    ...RegularSpace
  }
}
    ${RegularUserFragmentDoc}
${RegularSpaceFragmentDoc}`;
export const ConfirmUserCheckDocument = gql`
    mutation ConfirmUserCheck($studentId: String!) {
  confirmUserCheck(studentId: $studentId) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type ConfirmUserCheckMutationFn = Apollo.MutationFunction<ConfirmUserCheckMutation, ConfirmUserCheckMutationVariables>;

/**
 * __useConfirmUserCheckMutation__
 *
 * To run a mutation, you first call `useConfirmUserCheckMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmUserCheckMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmUserCheckMutation, { data, loading, error }] = useConfirmUserCheckMutation({
 *   variables: {
 *      studentId: // value for 'studentId'
 *   },
 * });
 */
export function useConfirmUserCheckMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmUserCheckMutation, ConfirmUserCheckMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmUserCheckMutation, ConfirmUserCheckMutationVariables>(ConfirmUserCheckDocument, options);
      }
export type ConfirmUserCheckMutationHookResult = ReturnType<typeof useConfirmUserCheckMutation>;
export type ConfirmUserCheckMutationResult = Apollo.MutationResult<ConfirmUserCheckMutation>;
export type ConfirmUserCheckMutationOptions = Apollo.BaseMutationOptions<ConfirmUserCheckMutation, ConfirmUserCheckMutationVariables>;
export const CreatePostsDocument = gql`
    mutation CreatePosts($title: String!, $content: String!, $spaceName: String!) {
  createPosts(title: $title, content: $content, spaceName: $spaceName) {
    ...PostSnippet
  }
}
    ${PostSnippetFragmentDoc}`;
export type CreatePostsMutationFn = Apollo.MutationFunction<CreatePostsMutation, CreatePostsMutationVariables>;

/**
 * __useCreatePostsMutation__
 *
 * To run a mutation, you first call `useCreatePostsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostsMutation, { data, loading, error }] = useCreatePostsMutation({
 *   variables: {
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      spaceName: // value for 'spaceName'
 *   },
 * });
 */
export function useCreatePostsMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostsMutation, CreatePostsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostsMutation, CreatePostsMutationVariables>(CreatePostsDocument, options);
      }
export type CreatePostsMutationHookResult = ReturnType<typeof useCreatePostsMutation>;
export type CreatePostsMutationResult = Apollo.MutationResult<CreatePostsMutation>;
export type CreatePostsMutationOptions = Apollo.BaseMutationOptions<CreatePostsMutation, CreatePostsMutationVariables>;
export const CreateSpaceDocument = gql`
    mutation CreateSpace($spaceName: String!, $spaceDescription: String!) {
  createSpace(spaceName: $spaceName, spaceDescription: $spaceDescription)
}
    `;
export type CreateSpaceMutationFn = Apollo.MutationFunction<CreateSpaceMutation, CreateSpaceMutationVariables>;

/**
 * __useCreateSpaceMutation__
 *
 * To run a mutation, you first call `useCreateSpaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSpaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSpaceMutation, { data, loading, error }] = useCreateSpaceMutation({
 *   variables: {
 *      spaceName: // value for 'spaceName'
 *      spaceDescription: // value for 'spaceDescription'
 *   },
 * });
 */
export function useCreateSpaceMutation(baseOptions?: Apollo.MutationHookOptions<CreateSpaceMutation, CreateSpaceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSpaceMutation, CreateSpaceMutationVariables>(CreateSpaceDocument, options);
      }
export type CreateSpaceMutationHookResult = ReturnType<typeof useCreateSpaceMutation>;
export type CreateSpaceMutationResult = Apollo.MutationResult<CreateSpaceMutation>;
export type CreateSpaceMutationOptions = Apollo.BaseMutationOptions<CreateSpaceMutation, CreateSpaceMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($postId: String!) {
  deletePost(postId: $postId)
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const DeleteSpaceDocument = gql`
    mutation DeleteSpace($spaceId: String!) {
  deleteSpace(spaceId: $spaceId) {
    ...RegularSpaceResponse
  }
}
    ${RegularSpaceResponseFragmentDoc}`;
export type DeleteSpaceMutationFn = Apollo.MutationFunction<DeleteSpaceMutation, DeleteSpaceMutationVariables>;

/**
 * __useDeleteSpaceMutation__
 *
 * To run a mutation, you first call `useDeleteSpaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSpaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSpaceMutation, { data, loading, error }] = useDeleteSpaceMutation({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *   },
 * });
 */
export function useDeleteSpaceMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSpaceMutation, DeleteSpaceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSpaceMutation, DeleteSpaceMutationVariables>(DeleteSpaceDocument, options);
      }
export type DeleteSpaceMutationHookResult = ReturnType<typeof useDeleteSpaceMutation>;
export type DeleteSpaceMutationResult = Apollo.MutationResult<DeleteSpaceMutation>;
export type DeleteSpaceMutationOptions = Apollo.BaseMutationOptions<DeleteSpaceMutation, DeleteSpaceMutationVariables>;
export const FollowSpaceDocument = gql`
    mutation FollowSpace($spaceId: String!) {
  followSpace(spaceId: $spaceId)
}
    `;
export type FollowSpaceMutationFn = Apollo.MutationFunction<FollowSpaceMutation, FollowSpaceMutationVariables>;

/**
 * __useFollowSpaceMutation__
 *
 * To run a mutation, you first call `useFollowSpaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowSpaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followSpaceMutation, { data, loading, error }] = useFollowSpaceMutation({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *   },
 * });
 */
export function useFollowSpaceMutation(baseOptions?: Apollo.MutationHookOptions<FollowSpaceMutation, FollowSpaceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowSpaceMutation, FollowSpaceMutationVariables>(FollowSpaceDocument, options);
      }
export type FollowSpaceMutationHookResult = ReturnType<typeof useFollowSpaceMutation>;
export type FollowSpaceMutationResult = Apollo.MutationResult<FollowSpaceMutation>;
export type FollowSpaceMutationOptions = Apollo.BaseMutationOptions<FollowSpaceMutation, FollowSpaceMutationVariables>;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($data: RegisterInput!) {
  registerUser(data: $data) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const SearchQueryDocument = gql`
    mutation SearchQuery($searchName: String!) {
  searchQuery(searchName: $searchName) {
    ...UserAndSpacesResponse
  }
}
    ${UserAndSpacesResponseFragmentDoc}`;
export type SearchQueryMutationFn = Apollo.MutationFunction<SearchQueryMutation, SearchQueryMutationVariables>;

/**
 * __useSearchQueryMutation__
 *
 * To run a mutation, you first call `useSearchQueryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSearchQueryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [searchQueryMutation, { data, loading, error }] = useSearchQueryMutation({
 *   variables: {
 *      searchName: // value for 'searchName'
 *   },
 * });
 */
export function useSearchQueryMutation(baseOptions?: Apollo.MutationHookOptions<SearchQueryMutation, SearchQueryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SearchQueryMutation, SearchQueryMutationVariables>(SearchQueryDocument, options);
      }
export type SearchQueryMutationHookResult = ReturnType<typeof useSearchQueryMutation>;
export type SearchQueryMutationResult = Apollo.MutationResult<SearchQueryMutation>;
export type SearchQueryMutationOptions = Apollo.BaseMutationOptions<SearchQueryMutation, SearchQueryMutationVariables>;
export const SendConfirmationMailDocument = gql`
    mutation SendConfirmationMail($studentId: String!) {
  sendConfirmationMail(studentId: $studentId)
}
    `;
export type SendConfirmationMailMutationFn = Apollo.MutationFunction<SendConfirmationMailMutation, SendConfirmationMailMutationVariables>;

/**
 * __useSendConfirmationMailMutation__
 *
 * To run a mutation, you first call `useSendConfirmationMailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendConfirmationMailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendConfirmationMailMutation, { data, loading, error }] = useSendConfirmationMailMutation({
 *   variables: {
 *      studentId: // value for 'studentId'
 *   },
 * });
 */
export function useSendConfirmationMailMutation(baseOptions?: Apollo.MutationHookOptions<SendConfirmationMailMutation, SendConfirmationMailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendConfirmationMailMutation, SendConfirmationMailMutationVariables>(SendConfirmationMailDocument, options);
      }
export type SendConfirmationMailMutationHookResult = ReturnType<typeof useSendConfirmationMailMutation>;
export type SendConfirmationMailMutationResult = Apollo.MutationResult<SendConfirmationMailMutation>;
export type SendConfirmationMailMutationOptions = Apollo.BaseMutationOptions<SendConfirmationMailMutation, SendConfirmationMailMutationVariables>;
export const UnFollowSpaceDocument = gql`
    mutation UnFollowSpace($spaceId: String!) {
  unfollowSpace(spaceId: $spaceId)
}
    `;
export type UnFollowSpaceMutationFn = Apollo.MutationFunction<UnFollowSpaceMutation, UnFollowSpaceMutationVariables>;

/**
 * __useUnFollowSpaceMutation__
 *
 * To run a mutation, you first call `useUnFollowSpaceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnFollowSpaceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unFollowSpaceMutation, { data, loading, error }] = useUnFollowSpaceMutation({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *   },
 * });
 */
export function useUnFollowSpaceMutation(baseOptions?: Apollo.MutationHookOptions<UnFollowSpaceMutation, UnFollowSpaceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnFollowSpaceMutation, UnFollowSpaceMutationVariables>(UnFollowSpaceDocument, options);
      }
export type UnFollowSpaceMutationHookResult = ReturnType<typeof useUnFollowSpaceMutation>;
export type UnFollowSpaceMutationResult = Apollo.MutationResult<UnFollowSpaceMutation>;
export type UnFollowSpaceMutationOptions = Apollo.BaseMutationOptions<UnFollowSpaceMutation, UnFollowSpaceMutationVariables>;
export const UpdatePostDocument = gql`
    mutation UpdatePost($postId: String!, $title: String!, $content: String!) {
  updatePost(postId: $postId, title: $title, content: $content) {
    ...PostSnippet
  }
}
    ${PostSnippetFragmentDoc}`;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      title: // value for 'title'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($username: String!, $bio: String!, $twitterAcc: String!, $instagramAcc: String!) {
  updateUserDetails(
    username: $username
    bio: $bio
    twitterAcc: $twitterAcc
    instagramAcc: $instagramAcc
  ) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      bio: // value for 'bio'
 *      twitterAcc: // value for 'twitterAcc'
 *      instagramAcc: // value for 'instagramAcc'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const VoteDocument = gql`
    mutation Vote($value: Int!, $postId: String!) {
  vote(value: $value, postId: $postId)
}
    `;
export type VoteMutationFn = Apollo.MutationFunction<VoteMutation, VoteMutationVariables>;

/**
 * __useVoteMutation__
 *
 * To run a mutation, you first call `useVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteMutation, { data, loading, error }] = useVoteMutation({
 *   variables: {
 *      value: // value for 'value'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useVoteMutation(baseOptions?: Apollo.MutationHookOptions<VoteMutation, VoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VoteMutation, VoteMutationVariables>(VoteDocument, options);
      }
export type VoteMutationHookResult = ReturnType<typeof useVoteMutation>;
export type VoteMutationResult = Apollo.MutationResult<VoteMutation>;
export type VoteMutationOptions = Apollo.BaseMutationOptions<VoteMutation, VoteMutationVariables>;
export const GetAllSpacesByUserDocument = gql`
    query GetAllSpacesByUser {
  getAllSpacesofUser {
    ...RegularSpace
  }
}
    ${RegularSpaceFragmentDoc}`;

/**
 * __useGetAllSpacesByUserQuery__
 *
 * To run a query within a React component, call `useGetAllSpacesByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllSpacesByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllSpacesByUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllSpacesByUserQuery(baseOptions?: Apollo.QueryHookOptions<GetAllSpacesByUserQuery, GetAllSpacesByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllSpacesByUserQuery, GetAllSpacesByUserQueryVariables>(GetAllSpacesByUserDocument, options);
      }
export function useGetAllSpacesByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllSpacesByUserQuery, GetAllSpacesByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllSpacesByUserQuery, GetAllSpacesByUserQueryVariables>(GetAllSpacesByUserDocument, options);
        }
export type GetAllSpacesByUserQueryHookResult = ReturnType<typeof useGetAllSpacesByUserQuery>;
export type GetAllSpacesByUserLazyQueryHookResult = ReturnType<typeof useGetAllSpacesByUserLazyQuery>;
export type GetAllSpacesByUserQueryResult = Apollo.QueryResult<GetAllSpacesByUserQuery, GetAllSpacesByUserQueryVariables>;
export const GetAllUserPostsDocument = gql`
    query GetAllUserPosts {
  getAllUserPosts {
    ...PostSnippet
  }
}
    ${PostSnippetFragmentDoc}`;

/**
 * __useGetAllUserPostsQuery__
 *
 * To run a query within a React component, call `useGetAllUserPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUserPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUserPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUserPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUserPostsQuery, GetAllUserPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUserPostsQuery, GetAllUserPostsQueryVariables>(GetAllUserPostsDocument, options);
      }
export function useGetAllUserPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUserPostsQuery, GetAllUserPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUserPostsQuery, GetAllUserPostsQueryVariables>(GetAllUserPostsDocument, options);
        }
export type GetAllUserPostsQueryHookResult = ReturnType<typeof useGetAllUserPostsQuery>;
export type GetAllUserPostsLazyQueryHookResult = ReturnType<typeof useGetAllUserPostsLazyQuery>;
export type GetAllUserPostsQueryResult = Apollo.QueryResult<GetAllUserPostsQuery, GetAllUserPostsQueryVariables>;
export const GetFeedPostsDocument = gql`
    query getFeedPosts($cursor: String, $limit: Int!) {
  getFeedPosts(cursor: $cursor, limit: $limit) {
    hasMore
    posts {
      ...PostSnippet
    }
  }
}
    ${PostSnippetFragmentDoc}`;

/**
 * __useGetFeedPostsQuery__
 *
 * To run a query within a React component, call `useGetFeedPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFeedPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFeedPostsQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetFeedPostsQuery(baseOptions: Apollo.QueryHookOptions<GetFeedPostsQuery, GetFeedPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFeedPostsQuery, GetFeedPostsQueryVariables>(GetFeedPostsDocument, options);
      }
export function useGetFeedPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFeedPostsQuery, GetFeedPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFeedPostsQuery, GetFeedPostsQueryVariables>(GetFeedPostsDocument, options);
        }
export type GetFeedPostsQueryHookResult = ReturnType<typeof useGetFeedPostsQuery>;
export type GetFeedPostsLazyQueryHookResult = ReturnType<typeof useGetFeedPostsLazyQuery>;
export type GetFeedPostsQueryResult = Apollo.QueryResult<GetFeedPostsQuery, GetFeedPostsQueryVariables>;
export const GetPostsOfSpacesDocument = gql`
    query GetPostsOfSpaces($postSpaceId: String!) {
  getPostsofSpace(postSpaceId: $postSpaceId) {
    ...PostSnippet
  }
}
    ${PostSnippetFragmentDoc}`;

/**
 * __useGetPostsOfSpacesQuery__
 *
 * To run a query within a React component, call `useGetPostsOfSpacesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsOfSpacesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsOfSpacesQuery({
 *   variables: {
 *      postSpaceId: // value for 'postSpaceId'
 *   },
 * });
 */
export function useGetPostsOfSpacesQuery(baseOptions: Apollo.QueryHookOptions<GetPostsOfSpacesQuery, GetPostsOfSpacesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostsOfSpacesQuery, GetPostsOfSpacesQueryVariables>(GetPostsOfSpacesDocument, options);
      }
export function useGetPostsOfSpacesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsOfSpacesQuery, GetPostsOfSpacesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostsOfSpacesQuery, GetPostsOfSpacesQueryVariables>(GetPostsOfSpacesDocument, options);
        }
export type GetPostsOfSpacesQueryHookResult = ReturnType<typeof useGetPostsOfSpacesQuery>;
export type GetPostsOfSpacesLazyQueryHookResult = ReturnType<typeof useGetPostsOfSpacesLazyQuery>;
export type GetPostsOfSpacesQueryResult = Apollo.QueryResult<GetPostsOfSpacesQuery, GetPostsOfSpacesQueryVariables>;
export const GetPostsByUserIdDocument = gql`
    query GetPostsByUserId($id: String!) {
  getPostsByUserId(id: $id) {
    ...PostSnippet
  }
}
    ${PostSnippetFragmentDoc}`;

/**
 * __useGetPostsByUserIdQuery__
 *
 * To run a query within a React component, call `useGetPostsByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsByUserIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPostsByUserIdQuery(baseOptions: Apollo.QueryHookOptions<GetPostsByUserIdQuery, GetPostsByUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostsByUserIdQuery, GetPostsByUserIdQueryVariables>(GetPostsByUserIdDocument, options);
      }
export function useGetPostsByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsByUserIdQuery, GetPostsByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostsByUserIdQuery, GetPostsByUserIdQueryVariables>(GetPostsByUserIdDocument, options);
        }
export type GetPostsByUserIdQueryHookResult = ReturnType<typeof useGetPostsByUserIdQuery>;
export type GetPostsByUserIdLazyQueryHookResult = ReturnType<typeof useGetPostsByUserIdLazyQuery>;
export type GetPostsByUserIdQueryResult = Apollo.QueryResult<GetPostsByUserIdQuery, GetPostsByUserIdQueryVariables>;
export const GetSpaceDetailsDocument = gql`
    query GetSpaceDetails($spaceId: String!) {
  getSpaceDetails(spaceId: $spaceId) {
    spaceId
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

/**
 * __useGetSpaceDetailsQuery__
 *
 * To run a query within a React component, call `useGetSpaceDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSpaceDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSpaceDetailsQuery({
 *   variables: {
 *      spaceId: // value for 'spaceId'
 *   },
 * });
 */
export function useGetSpaceDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetSpaceDetailsQuery, GetSpaceDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSpaceDetailsQuery, GetSpaceDetailsQueryVariables>(GetSpaceDetailsDocument, options);
      }
export function useGetSpaceDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSpaceDetailsQuery, GetSpaceDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSpaceDetailsQuery, GetSpaceDetailsQueryVariables>(GetSpaceDetailsDocument, options);
        }
export type GetSpaceDetailsQueryHookResult = ReturnType<typeof useGetSpaceDetailsQuery>;
export type GetSpaceDetailsLazyQueryHookResult = ReturnType<typeof useGetSpaceDetailsLazyQuery>;
export type GetSpaceDetailsQueryResult = Apollo.QueryResult<GetSpaceDetailsQuery, GetSpaceDetailsQueryVariables>;
export const MeDocument = gql`
    query me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const StudentDetailsDocument = gql`
    query StudentDetails($id: String!) {
  studentDetails(id: $id) {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useStudentDetailsQuery__
 *
 * To run a query within a React component, call `useStudentDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useStudentDetailsQuery(baseOptions: Apollo.QueryHookOptions<StudentDetailsQuery, StudentDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StudentDetailsQuery, StudentDetailsQueryVariables>(StudentDetailsDocument, options);
      }
export function useStudentDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StudentDetailsQuery, StudentDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StudentDetailsQuery, StudentDetailsQueryVariables>(StudentDetailsDocument, options);
        }
export type StudentDetailsQueryHookResult = ReturnType<typeof useStudentDetailsQuery>;
export type StudentDetailsLazyQueryHookResult = ReturnType<typeof useStudentDetailsLazyQuery>;
export type StudentDetailsQueryResult = Apollo.QueryResult<StudentDetailsQuery, StudentDetailsQueryVariables>;