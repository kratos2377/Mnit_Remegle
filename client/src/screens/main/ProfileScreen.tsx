import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, FlatList } from "react-native";
import { Appbar, Button, Card, IconButton } from "react-native-paper";
import { SocialIcon } from "react-native-elements";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as Linking from "expo-linking";
import {
  useGetAllUserPostsQuery,
  useMeQuery,
  useVoteMutation,
} from "../../generated/graphql";
import { MainNavProps } from "../../utils/MainParamList";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ProfileScreenProps {}

export const ProfileScreen = ({ navigation }: MainNavProps<"Profile">) => {
  const { data, error, variables } = useGetAllUserPostsQuery();
  const { data: userData, error: userError } = useMeQuery();

  const [voteMut] = useVoteMutation();
  const [loadingState, setLoadingState] =
    useState<"updoot-loading" | "downdoot-loading" | "not-loading">(
      "not-loading"
    );

    var userId = ""

    useEffect(() => {
      const getDetails = async () => {
        const userData = await AsyncStorage.getItem("userData");
  
        const newData = JSON.parse(userData);
  
        userId = newData.id;
      };
  
      getDetails();
    }, []);
  
    const LeftContent = (url: string) => (
      <Image
        style={{ width: 50, height: 50, borderRadius: 25 }}
        source={{ uri: url }}
      />
    );
  
    const RightContent = (
      spaceName: string,
      creatorId: string,
      title: string,
      content: string,
      spaceId: string,
      postId: string,
    ) => (
      <View>
           {userId.toString == creatorId.toString ? (
          
  
  <IconButton
  style={{alignSelf: 'flex-end'}}
            icon="circle-edit-outline"
            onPress={() =>
              navigation.navigate("EditPostScreen", {
                title: title,
                content: content,
                postId: postId
              })
            } 
            />
        
        ) : null }
  
        <Text style={{ marginBottom: 10, marginRight: 5 }}>
          {<Button onPress={() => {
            navigation.navigate("GoToSpace" , {
              id: spaceId
            })
          }}>{spaceName}</Button>}
        </Text>
      </View>
    );
  
    const renderPostCardItem = (item) => (
      <View style={{ flexDirection: "row" }}>
        <Card
          style={{
            marginVertical: 10,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton
              icon="chevron-triple-up"
              size={20}
              color={item.item.voteStatus === 1 ? "green" : "black"}
              onPress={async () => {
                if (item.item.voteStatus === 1) {
                  return;
                }
                setLoadingState("updoot-loading");
                await voteMut({
                  variables: {
                    postId: item.item.postId,
                    value: 1,
                  },
                });
                setLoadingState("not-loading");
              }}
            />
  
            <Text>{item.item.points}</Text>
            <IconButton
              icon="chevron-triple-down"
              size={20}
              color={item.item.voteStatus === -1 ? "red" : "black"}
              onPress={async () => {
                if (item.item.voteStatus === -1) {
                  return;
                }
                setLoadingState("downdoot-loading");
                await voteMut({
                  variables: {
                    postId: item.item.postId,
                    value: -1,
                  },
                });
                setLoadingState("not-loading");
              }}
            />
          </View>
        </Card>
  
        <Card style={{ marginVertical: 10, flex: 1, marginHorizontal: 5 }}>
          <Card.Title
            title={item.item.creator.fullName}
            subtitle={item.item.creator.studentId}
            left={() => LeftContent(item.item.creator.avatarUrl)}
            right={() =>
              RightContent(
                item.item.spaceName,
                item?.item?.creatorId,
                item.item.title,
                item.item.content,
                item.item.postSpaceId,
                item.item.postId,
              )
            }
          />
  
          <Text style={{ margin: 10, color: "black" }}>{item.item.title}</Text>
          <Text style={{ color: "black" }}>{item.item.content}</Text>
        </Card>
      
      
       
      </View>
    );

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <ScrollView>
        <Appbar.Header style={{ backgroundColor: "white" }}>
          <Appbar.Content
            title={userData?.me?.username}
            subtitle={userData?.me.studentId}
          />
          <Appbar.Action
            icon="dots-vertical-circle"
            onPress={() => navigation.navigate("Settings")}
          />
        </Appbar.Header>

        <View style={{ marginBottom: 10, marginTop: 10 }}>
          <Card
            style={{
              width: "100%",
              padding: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              style={{ width: 200, height: 200, borderRadius: 100 }}
              source={{ uri: userData?.me?.avatarUrl }}
            />
            <Text style={{ marginBottom: 10 }}>{userData?.me?.fullName}</Text>
            <Text style={{ marginBottom: 10 }}>{userData?.me?.bio}</Text>
            <View style={{ flexDirection: "row" }}>
              <SocialIcon
                type="instagram"
                onPress={() => Linking.openURL("https://instagram.com")}
              />
              <SocialIcon
                type="twitter"
                onPress={() => Linking.openURL("https://twitter.com")}
              />
            </View>
          </Card>
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            data={data?.getAllUserPosts}
            keyExtractor={(item) => item.postId}
            renderItem={renderPostCardItem}
          />
        </View>
      </ScrollView>
    </View>
  );
};
