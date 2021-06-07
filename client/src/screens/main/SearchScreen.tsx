import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useState , useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import { Colors, Searchbar } from "react-native-paper";
import { RegularSpaceFragment, RegularUserFragment, useSearchQueryMutation } from "../../generated/graphql";
import { RenderSearchTabs } from "../extra-screens/RenderSearchTabs";
import { SpaceSearchScreen } from "../extra-screens/SpaceSearchScreen";
import { UserSearchScreen } from "../extra-screens/UserSearchScreen";

interface SearchScreenProps {}

export const SearchScreen: React.FC<SearchScreenProps> = ({}) => {
  const TopTab = createMaterialTopTabNavigator();
  const [searchText, setSearchText] = useState("");
  const [search] = useSearchQueryMutation();
  var [searchFeedSpaces, setSpaces] = useState<RegularSpaceFragment[]>([]);
  var [searchFeedUsers, setUsers] = useState<RegularUserFragment[]>([]);
  const searchHandler = async () => {

    if(searchText === ""){
      setSpaces([])
      setUsers([])
      return;
    }

    const values = {
      searchName: searchText,
    };
    const response = await search({ variables: values });

    setSpaces([...response.data?.searchQuery?.spaces]);
    setUsers([...response.data?.searchQuery?.users]);

    console.log(searchFeedSpaces)
    console.log(searchFeedUsers)
  };

  useEffect(() => {
   
  } , [searchFeedSpaces , searchFeedUsers])

  const reRender = () =>  <RenderSearchTabs users = {searchFeedUsers} spaces={searchFeedSpaces} />

  const renderUserItem = (item : RegularUserFragment) => (
    <TouchableOpacity onPress={() => console.log(item.id)}>
      <View>
        <ListItem key={item.id} bottomDivider>
          <Avatar source={{ uri: item.avatarUrl }} />
          <ListItem.Content>
            <ListItem.Title style={{color: 'black'}}>{item.fullName}</ListItem.Title>
            <ListItem.Subtitle>{item.studentId}</ListItem.Subtitle>
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

          if (value.trim().length == 0 ) {
            setSpaces([]);
            setSpaces([]);
          }
        }}
        value={searchText}
        onIconPress={searchHandler}
      />

      {searchFeedSpaces.length !== 0 || searchFeedUsers.length !== 0 ? (
        reRender()
      ) : null}
    </View>
  );
};
