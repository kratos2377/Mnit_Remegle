import React from "react";
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import { useGetAllSpacesByUserQuery } from "../../generated/graphql";

interface YourSpacesProps {}

export const YourSpaces = ({}) => {
  const { data, loading, variables } = useGetAllSpacesByUserQuery();
  
  const renderSpaceItem = (item) => (
    <TouchableOpacity onPress={() => console.log(item.item.spaceId)}>
      <View>
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
      {loading ? (
        data?.getAllSpacesofUser?.length === 0 ? (
          <ActivityIndicator
            style={{ alignSelf: "center" }}
            size="large"
            color="#0000ff"
          />
        ) : (
          <Text>You Have Not Created Any Spaces</Text>
        )
      ) : (
        <FlatList
          data={data?.getAllSpacesofUser}
          keyExtractor={(item) => item.spaceId}
          renderItem={renderSpaceItem}
        />
      )}
    </View>
  );
};
