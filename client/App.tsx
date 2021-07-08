import React from 'react';
import { Platform } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import HomeScreen from './src/screens/HomeScreen';
import { PaginatedPosts } from './src/generated/graphql';
import firebase from 'firebase/app';
import { REACT_APP_BACKEND_HOST } from './values';

const host =
  Platform.OS === 'web' ? 'http://localhost:5000' : 'http://10.0.2.2:5000';

const firebaseConfig = {
  apiKey: 'AIzaSyDVZfJaN3JGRaxyttYKMY0VHVN1f_1GMMI',
  authDomain: 'test003-8e00a.firebaseapp.com',
  projectId: 'test003-8e00a',
  storageBucket: 'test003-8e00a.appspot.com',
  messagingSenderId: '811655092200',
  appId: '1:811655092200:web:7445d4b54f6c37a105765d',
  measurementId: 'G-DZQDMLK7NY'
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const client = new ApolloClient({
  uri: REACT_APP_BACKEND_HOST as string,
  credentials: 'include',
  cache: new InMemoryCache({
    typePolicies: {
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
                posts: [...(existing?.posts || []), ...incoming.posts]
              };
            }
          }
        }
      }
    }
  })
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <HomeScreen />
    </ApolloProvider>
  );
}
