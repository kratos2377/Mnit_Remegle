import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react'
import { Colors } from 'react-native-paper';
import { RegularSpaceFragment, RegularUserFragment } from '../../generated/graphql';
import { SpaceSearchScreen } from './SpaceSearchScreen';
import { UserSearchScreen } from './UserSearchScreen';

interface RenderSearchTabsProps {
 users: RegularUserFragment[];
 spaces: RegularSpaceFragment[]
}

export const RenderSearchTabs: React.FC<RenderSearchTabsProps> = ({ users , spaces}) => {

const TopTab = createMaterialTopTabNavigator()

        return (
             <TopTab.Navigator
          initialRouteName="Users"
          tabBarOptions={{
            activeTintColor: Colors.white,
            labelStyle: {
              textTransform: "uppercase",
            },
            inactiveTintColor: Colors.black,
            indicatorStyle: {
              height: null,
              top: "10%",
              bottom: "10%",
              width: "45%",
              left: "2.5%",
              borderRadius: 100,
              backgroundColor: Colors.blue500,
            },
            style: {
              alignSelf: "center",
              width: "50%",
              borderRadius: 100,
              borderColor: "blue",
              backgroundColor: "white",
              elevation: 5, // shadow on Android
              shadowOpacity: 0.1, // shadow on iOS,
              shadowRadius: 4, // shadow blur on iOS
            },
            tabStyle: {
              borderRadius: 100,
            },
          }}
          swipeEnabled={true}
        >
          <TopTab.Screen
            name="Users"
            component={UserSearchScreen}
            initialParams={{ users }}
          />
          <TopTab.Screen
            name="Spaces"
            component={SpaceSearchScreen}
            initialParams={{  spaces }}
          />
         </TopTab.Navigator>
        );
}