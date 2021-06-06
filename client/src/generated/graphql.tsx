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
  updateUserDetails: Scalars['Boolean'];
  generateforgotPasswordUrl: Scalars['Boolean'];
  changeForgotPassword: Scalars['Boolean'];
  forgotPassword: UserResponse;
  deleteUser: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  searchQuery?: Maybe<UserandSpaces>;
};


export type MutationVoteArgs = {
  value: Scalars['Float'];
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
  getSpaces?: Maybe<Array<Spaces>>;
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
  studentId: Scalars['String'];
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
  & Pick<Post, 'postId' | 'creatorId' | 'points' | 'voteStatus' | 'title' | 'content' | 'createdAt'>
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
  & Pick<Spaces, 'spaceId' | 'adminId' | 'type' | 'spaceName' | 'spaceDescription'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'fullName' | 'email' | 'studentId' | 'gender' | 'avatarUrl' | 'isBanned' | 'bio'>
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

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
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