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
  studentId: Scalars['String'];
  spaceName: Scalars['String'];
};


export type MutationUnfollowSpaceArgs = {
  studentId: Scalars['String'];
  spaceName: Scalars['String'];
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
  getFeedPosts: Array<Post>;
  getPostsByUserId?: Maybe<Array<Post>>;
  checkifUserFollowSpace: Array<Post>;
  getAllUserPosts?: Maybe<Array<Post>>;
  getSpaces?: Maybe<Array<Spaces>>;
  getAllSpacesofUser?: Maybe<Array<Spaces>>;
  getSpaceByName: Array<Spaces>;
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


export type QueryGetPostsofSpaceArgs = {
  spaceName: Scalars['String'];
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
  sapce?: Maybe<Spaces>;
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
  & Pick<Post, 'postId' | 'creatorId' | 'points' | 'voteStatus' | 'title' | 'content' | 'createdAt' | 'spaceName'>
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

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'fullName' | 'email' | 'studentId' | 'gender' | 'avatarUrl' | 'instagramAcc' | 'twitterAcc' | 'isBanned' | 'bio'>
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

export type CreateSpaceMutationVariables = Exact<{
  spaceName: Scalars['String'];
  spaceDescription: Scalars['String'];
}>;


export type CreateSpaceMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createSpace'>
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
  & { getFeedPosts: Array<(
    { __typename?: 'Post' }
    & PostSnippetFragment
  )> }
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
    ...PostSnippet
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