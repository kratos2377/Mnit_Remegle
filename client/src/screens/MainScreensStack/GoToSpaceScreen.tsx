import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import {
  Appbar,
  Card,
  Title,
  Button,
  Paragraph,
  IconButton,
  ActivityIndicator,
} from "react-native-paper";
import {
  useCreateSpaceMutation,
  useGetPostsOfSpacesQuery,
  useGetSpaceDetailsQuery,
  useVoteMutation,
} from "../../generated/graphql";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "react-native";
import { MainNavProps } from "../../utils/MainParamList";
import { Avatar, ListItem } from "react-native-elements";

interface GoToSpaceScreenProps {}

export const GoToSpaceScreen = ({
  navigation,
  route,
}: MainNavProps<"GoToSpace">) => {
  var userId: string = "";
  const [pageLoading, setPageLoading] = useState(true);
  const [following, setFollowing] = useState(false);
  const [createPost] = useCreateSpaceMutation()
  const { data: postData } = useGetPostsOfSpacesQuery({
    variables: {
      postSpaceId: route?.params.id,
    },
  });

  const { data, loading } = useGetSpaceDetailsQuery({
    variables: {
      spaceId: route?.params.id,
    },
  });

  const [display, setDisplay] = useState<"Post" | "User">("Post");
  const [voteMut] = useVoteMutation();
  const [loadingState, setLoadingState] =
    useState<"updoot-loading" | "downdoot-loading" | "not-loading">(
      "not-loading"
    );

  const RightContent = (followers: number) => <Text>Users: {followers}</Text>;

  const LeftContent = (url: string) => (
    <Image
      style={{ width: 40, height: 40, borderRadius: 20 }}
      source={{ uri: url }}
    />
  );

  useEffect(() => {
    const getDetails = async () => {
      const userData = await AsyncStorage.getItem("userData");
      const newData = JSON.parse(userData);
      for (var i = 0; i < data?.getSpaceDetails?.followingIds?.length; i++) {
        if (data?.getSpaceDetails.followingIds[i].id == newData.id) {
          setFollowing(true);
          setPageLoading(false);
          break;
        }
      }
    };

    getDetails();
  }, [data]);

  const renderUserItem = (item) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("GoToProfile", {
          id: item.item.id,
        })
      }
    >
      <View style={{ margin: 10 }}>
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

  const unFollow = () => {
    setFollowing(false);
    console.log("Unfollow Space");
  };

  const Follow = () => {
    setFollowing(true);
    console.log("Follow Space");
  };

  return (
    <View>
      {pageLoading ? (
        <ActivityIndicator style={{ justifyContent: "center" }} />
      ) : (
        <View>
          <Appbar.Header style={{ backgroundColor: "white" }}>
            <Appbar.BackAction onPress={() => navigation.pop()} />
            <Appbar.Content title={data?.getSpaceDetails.spaceName} />
            <Appbar.Action icon="postage-stamp" onPress={() => navigation.navigate("CreatePost" , {
              spaceName: data?.getSpaceDetails.spaceName
            })} />
            {following ? (
              <Button mode="text" color="red" onPress={unFollow}>
                Unfollow
              </Button>
            ) : (
              <Button mode="text" color="blue" onPress={Follow}>
                Follow
              </Button>
            )}
          </Appbar.Header>
          <Card style={{ margin: 10 }}>
            <Card.Title
              style={{ margin: 10, padding: 15 }}
              title={data?.getSpaceDetails.spaceName}
              right={() =>
                RightContent(data?.getSpaceDetails.followingIds.length)
              }
              left={() => LeftContent(data?.getSpaceDetails.spaceAvatarUrl)}
            />
          </Card>
          <Card style={{ marginBottom: 10, marginHorizontal: 10 }}>
            <Card.Title title="Space Description" />
            <Card.Content>
              <Paragraph>{data?.getSpaceDetails.spaceDescription}</Paragraph>
            </Card.Content>
          </Card>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-around",
            }}
          >
            <Button icon="postage-stamp" onPress={() => setDisplay("Post")}>
              {" "}
              Spaces
            </Button>
            <Button icon="account" onPress={() => setDisplay("User")}>
              {" "}
              Users
            </Button>
          </View>
          {display === "Post" ? (
            <FlatList
              numColumns={1}
              data={postData?.getPostsofSpace}
              keyExtractor={(item) => item.postId}
              renderItem={renderPostItem}
            />
          ) : (
            <FlatList
              numColumns={1}
              data={data?.getSpaceDetails.followingIds}
              keyExtractor={(item) => item.id}
              renderItem={renderUserItem}
            />
          )}
        </View>
      )}
    </View>
  );
};
