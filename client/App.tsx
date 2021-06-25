import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import HomeScreen from './src/screens/HomeScreen';
import { PaginatedPosts } from './src/generated/graphql';


const host = Platform.OS === "web" ? 'http://localhost:5000' : "http://10.0.2.2:5000";

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  credentials: "include",
  cache: new InMemoryCache({
    typePolicies: {
      Post: {
        keyFields: ["postId"]
      },
      Query: {
        fields: {
          posts: {     
            keyArgs: [],
            merge(
              existing: PaginatedPosts | undefined,
              incoming: PaginatedPosts
            ): PaginatedPosts {
              return {
                ...incoming,
                posts: [...(existing?.posts || []), ...incoming.posts],
              };
            },
          },
        },
      },
    },
  })
});

export default function App() {
  return (
   <ApolloProvider client={client}>
      <HomeScreen/>
   </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
