import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { fakefeedscreen } from '../fake_screens.tsx/fakefeedscreen';
import { MainNavProps } from '../utils/MainParamList';
import { FeedScreen } from './main/FeedScreen';
import { ProfileScreen } from './main/ProfileScreen';
import { SearchScreen } from './main/SearchScreen';
import { VideoChatScreen } from './main/VideoChatScreen';

interface MainScreeProps {}

export const MainScreen = ({ navigation }: MainNavProps<'Main'>) => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName="Feed" tabBarOptions={{ showLabel: false }}>
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          )
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={26} />
          )
        }}
      />
      <Tab.Screen
        name="Video"
        component={VideoChatScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="message-video"
              color={color}
              size={26}
            />
          )
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-circle"
              color={color}
              size={26}
            />
          )
        }}
      />
    </Tab.Navigator>
  );
};
