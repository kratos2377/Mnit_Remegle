import React, { useState } from "react";
import { FlatList, ScrollView, View, Text, Image } from "react-native";
import { SocialIcon } from "react-native-elements";
import { Appbar, Card, IconButton } from "react-native-paper";
import {
  useGetPostsByUserIdQuery,
  useStudentDetailsQuery,
  useVoteMutation,
} from "../../generated/graphql";
import * as Linking from "expo-linking";
import { MainNavProps } from "../../utils/MainParamList";

interface GoToProfileScreenProps {}

export const GoToProfileScreen = ({navigation , route }: MainNavProps<"GoToProfile">) => {

  const { data, error , variables } = useGetPostsByUserIdQuery({
    variables: {
      id: route.params?.id,
    },
    notifyOnNetworkStatusChange: true,
});

  const { data: userData, error: userError } = useStudentDetailsQuery({
    variables: {
        id: route.params?.id,
    }
  });

  console.log(data)
  console.log(userData)

  const [voteMut] = useVoteMutation();
  const [loadingState, setLoadingState] =
    useState<"updoot-loading" | "downdoot-loading" | "not-loading">(
      "not-loading"
    );

  const LeftContent = (url: string) => (
    <Image
      style={{ width: 50, height: 50, borderRadius: 25 }}
      source={{ uri: url }}
    />
  );

  const renderPostItem = (item) => (
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
            icon="chevron-up-box-outline"
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
            icon="chevron-down-box-outline"
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
          <Appbar.BackAction onPress={() => navigation.pop()}/>
          <Appbar.Content
            title={userData?.studentDetails?.username}
            subtitle={userData?.studentDetails?.studentId}
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
              source={{ uri: userData?.studentDetails?.avatarUrl }}
            />
            <Text style={{ marginBottom: 10 }}>
              {userData?.studentDetails?.fullName}
            </Text>
            <Text style={{ marginBottom: 10 }}>
              {userData?.studentDetails?.bio}
            </Text>
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
            numColumns={1}
            data={data?.getPostsByUserId}
            keyExtractor={(item) => item.postId}
            renderItem={renderPostItem}
          />
        </View>
      </ScrollView>
    </View>
  );
};
