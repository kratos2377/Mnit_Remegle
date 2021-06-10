import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, ScrollView } from "react-native";
import {
  Appbar,
  Button,
  Card,
  FAB,
  IconButton,
  Portal,
  Provider,
} from "react-native-paper";
import { FeedPostsCard } from "../../components/FeedPostsCard";
import {
  useGetFeedPostsQuery,
  useMeQuery,
  useVoteMutation,
} from "../../generated/graphql";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MainNavProps } from "../../utils/MainParamList";

interface FeedScreenProps {}

export const FeedScreen = ({ navigation }: MainNavProps<"Feed">) => {
  const [voteMut] = useVoteMutation();
  const [loadingState, setLoadingState] =
    useState<"updoot-loading" | "downdoot-loading" | "not-loading">(
      "not-loading"
    );

  const [state, setState] = useState({ open: false });
  var userId: string = "";



  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  const { data, error, loading, variables } = useGetFeedPostsQuery({
    variables: {
      limit: 15,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });

  const { data: userData } = useMeQuery();

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
    postId: string
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
              item.item.postId
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
      {data == null ? (
        <Text>No Data</Text>
      ) : (
        <ScrollView style={{ width: "100%" }}>
          <Appbar.Header
            style={{
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center",
              padding: 30,
            }}
          >
            <Image
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                margin: 20,
              }}
              source={{ uri: userData?.me?.avatarUrl }}
            />
            <Text style={{ fontSize: 20 }}>{userData?.me?.studentId}</Text>
          </Appbar.Header>
          <FlatList
            data={data?.getFeedPosts}
            keyExtractor={(item) => item.postId}
            renderItem={renderPostCardItem}
          />
        </ScrollView>
      )}

      <Provider>
        <Portal>
          <FAB.Group
            visible={true}
            open={open}
            icon={open ? "feather" : "fountain-pen-tip"}
            actions={[
              {
                icon: "postage-stamp",
                label: "Edit Profile",
                onPress: () => navigation.navigate("UpdateScreen"),
              },
              {
                icon: "account-group",
                label: "Create Space",
                onPress: () => navigation.navigate("CreateSpace"),
              },
            ]}
            onStateChange={onStateChange}
            onPress={() => {
              if (open) {
                // do something if the speed dial is open
              }
            }}
          />
        </Portal>
      </Provider>
    </View>
  );
};
