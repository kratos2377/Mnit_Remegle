import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useState } from "react";
import { View, Text } from "react-native";
import { Colors, Searchbar } from "react-native-paper";
import { useSearchQueryMutation } from "../../generated/graphql";
import { SpaceSearchScreen } from "../extra-screens/SpaceSearchScreen";
import { UserSearchScreen } from "../extra-screens/UserSearchScreen";

interface SearchScreenProps {}

export const SearchScreen: React.FC<SearchScreenProps> = ({}) => {
  const TopTab = createMaterialTopTabNavigator();
  const [searchText, setSearchText] = useState("");
  const [search] = useSearchQueryMutation();
  var [searchFeedSpaces, setSpaces] = useState([]);
  var [searchFeedUsers, setUsers] = useState([]);
  const searchHandler = async () => {
    const values = {
      searchName: searchText,
    };
    const response = await search({ variables: values });

    setSpaces([...response.data?.searchQuery?.spaces]);
    setUsers([...response.data?.searchQuery?.users]);

    console.log(response.data?.searchQuery);
  };

  return (
    <View>
      <Searchbar
      style={{marginBottom:10}}
        placeholder="Search Here..."
        onChangeText={(value) => {
          setSearchText(value);

          if (value === "") {
            setSpaces([]);
            setSpaces([]);
          }
        }}
        value={searchText}
        onIconPress={searchHandler}
      />

      {searchFeedSpaces.length !== 0 || searchFeedUsers.length !== 0 ? (
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
            initialParams={{ usersArray: searchFeedUsers }}
          />
          <TopTab.Screen
            name="Spaces"
            component={SpaceSearchScreen}
            initialParams={{ spacesArray: searchFeedSpaces }}
          />
        </TopTab.Navigator>
      ) : null}
    </View>
  );
};
