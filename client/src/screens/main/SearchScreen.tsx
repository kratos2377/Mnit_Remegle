import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import { Button, Colors, Searchbar } from "react-native-paper";
import {
  RegularSpaceFragment,
  RegularUserFragment,
  useSearchQueryMutation,
} from "../../generated/graphql";
import { MainNavProps } from "../../utils/MainParamList";
import { UserSearchScreen } from "../extra-screens/UserSearchScreen";

interface SearchScreenProps {}

export const SearchScreen = ({navigation} : MainNavProps<"SearchScreen">) => {
  const TopTab = createMaterialTopTabNavigator();
  const [searchText, setSearchText] = useState("");
  const [search] = useSearchQueryMutation();
  var [searchFeedSpaces, setSpaces] = useState<RegularSpaceFragment[]>([]);
  var [searchFeedUsers, setUsers] = useState<RegularUserFragment[]>([]);

  const [display, setDispaly] = useState<"Users" | "Spaces">("Users");
  const [displayItem, setDisplayItem] = useState([]);
  const searchHandler = async () => {
    if (searchText == "") {
      setSpaces([]);
      setUsers([]);
      return;
    }

    const values = {
      searchName: searchText,
    };
    const response = await search({ variables: values });

    setSpaces([...response.data?.searchQuery?.spaces]);
    setUsers([...response.data?.searchQuery?.users]);

    // console.log(searchFeedSpaces)
    // console.log(searchFeedUsers)
  };

  useEffect(() => {
    if(searchText === ""){
      setSpaces([]);
      setUsers([]);
    }
  }, [searchText]);

  

  const renderUserItem = (item) => (
    <TouchableOpacity onPress={() => navigation.navigate("GoToProfile" , {
      id: item.item.id
    })}>
      <View style={{margin: 10}}>
        <ListItem key={item.item.id} bottomDivider>
          <Avatar source={{ uri: item.item.avatarUrl }} />
          <ListItem.Content>
            <ListItem.Title style={{ color: "black" }}>
              {item.item.fullName}
            </ListItem.Title>
            <ListItem.Subtitle>{item.item.studentId}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </View>
    </TouchableOpacity>
  );

  const renderSpaceItem = (item) =>  (
      <TouchableOpacity onPress={() => console.log(item.item.spaceId)}>
      <View style={{ margin: 10}}>
        <ListItem key={item.item.spaceId} bottomDivider>
          <Avatar source={{ uri: item.item.spaceAvatarUrl }} />
          <ListItem.Content>
            <ListItem.Title style={{ color: "black" }}>
              {item.item.spaceName}
            </ListItem.Title>
            <ListItem.Subtitle>{item.item.type}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <Searchbar
        style={{ marginBottom: 10 }}
        placeholder="Search Here..."
        onChangeText={(value) => {
          setSearchText(value);

          if (value.trim().length == 0) {
            setSpaces([]);
            setSpaces([]);
          }
        }}
        value={searchText}
        onIconPress={searchHandler}
      />

      {searchFeedSpaces.length !== 0 || searchFeedUsers.length !== 0 ? (
        <View>
          <View style={{ flexDirection: "row", flex: 1 , justifyContent: 'space-around'}}>
            <Button icon="account" onPress={() => setDispaly("Users")} > Users</Button>
            <Button icon="bank" onPress={() => setDispaly("Spaces")}> Spaces</Button>
          </View>

          {display === "Users" ? (
            searchFeedUsers.length === 0 ? (
              <Text>No Users With This Name Exist</Text>
            ) : (
              <FlatList
                data={searchFeedUsers}
                keyExtractor={(item) => item.id}
                renderItem={renderUserItem}
              />
            )
          ) : searchFeedSpaces.length === 0 ? (
            <Text>No Spaces With This Name Exist</Text>
          ) : (
            <FlatList
              data={searchFeedSpaces}
              keyExtractor={(item) => item.spaceId}
              renderItem={renderSpaceItem}
            />
          )}
        </View>
      ) : (
        <View>
          <Text>Search KR na be</Text>
        </View>
      )}
    </View>
  );
};
