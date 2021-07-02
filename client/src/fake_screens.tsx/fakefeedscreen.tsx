import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { useGetFeedPostsQuery, useMeQuery } from '../generated/graphql';

interface fakefeedscreenProps {}

export const fakefeedscreen: React.FC<fakefeedscreenProps> = ({}) => {
  const { data, error, loading, fetchMore, variables } = useGetFeedPostsQuery({
    variables: {
      limit: 15,
      cursor: null
    },
    notifyOnNetworkStatusChange: true
  });

  const { data: userData } = useMeQuery();

  return (
    <SafeAreaView>
      <Text>{userData?.me?.fullName}</Text>
      <Text>{userData?.me?.id}</Text>
      <Text>{userData?.me?.username}</Text>
      <Text>{userData?.me?.email}</Text>
      <Text>{userData?.me?.godAdmin}</Text>
    </SafeAreaView>
  );
};
