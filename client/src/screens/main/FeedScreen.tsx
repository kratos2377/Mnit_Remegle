import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, ScrollView } from "react-native";
import SeeMore from 'react-native-see-more-inline';
import {
  ActivityIndicator,
  Appbar,
  Button,
  Card,
  Colors,
  Dialog,
  FAB,
  IconButton,
  Paragraph,
  Portal,
  Provider,
} from "react-native-paper";
import { FeedPostsCard } from "../../components/FeedPostsCard";
import {
  useDeletePostMutation,
  useGetFeedPostsQuery,
  useMeQuery,
  useVoteMutation,
} from "../../generated/graphql";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MainNavProps } from "../../utils/MainParamList";
import { updateAfterVote } from "../../functions/updateAfterVote";
import ReadMore from 'react-native-read-more-text';



interface FeedScreenProps {}

export const FeedScreen = ({ navigation }: MainNavProps<"Feed">) => {
  const [voteMut] = useVoteMutation();
  const [loadingState, setLoadingState] = useState<
    "updoot-loading" | "downdoot-loading" | "not-loading"
  >("not-loading");

  const [state, setState] = useState({ open: false });
  const [postDeletingLoading, setPostDeletingLoading] = useState(false);
  const [postDeleteDialog, setPostDeleteDialog] = useState(false);
  const [postDeleteSuccess, setPostDeleteSuccess] = useState(false);
  const [postIdDelete, setpostIdDelete] = useState("");
  const [postDelete] = useDeletePostMutation();
  const [userId, setUserId] = useState("");
  const [limitPost, setLimitPost] = useState<number>(15);

  const hidePostDeleteDialog = () => setPostDeleteDialog(false);

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  const { data, error, loading, fetchMore, variables } = useGetFeedPostsQuery({
    variables: {
      limit: limitPost,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });

  const { data: userData } = useMeQuery();

  useEffect(() => {
    const getDetails = async () => {
      const userData = await AsyncStorage.getItem("userData");

      const newData = JSON.parse(userData);
      setUserId(newData.id);
    };

    getDetails();
  }, []);

  const deletePostHandler = async () => {
    setPostDeletingLoading(true);
    setPostDeleteDialog(false);

    const response = await postDelete({
      variables: {
        postId: postIdDelete,
      },
      update: (cache) => {
        cache.evict({id: "Post:" + postIdDelete})
      }
    });

    if (!response.data?.deletePost) {
    }

    setPostDeletingLoading(false);

    setPostDeleteSuccess(true);

    setInterval(() => {
      setPostDeleteSuccess(false);
    }, 1000);
  };

  console.log(userId);

  const LeftContent = (url: string) => (
    <Image
      style={{ width: 50, height: 50, borderRadius: 25 }}
      source={{ uri: url }}
    />
  );
  const _renderTruncatedFooter = (handlePress) => {
    return (
      <Text style={{color: Colors.purple400, marginTop: 7}} onPress={handlePress}>
        Show more
      </Text>
    );
  }

 const  _renderRevealedFooter = (handlePress) => {
    return (
      <Text style={{color: Colors.purple400 , marginTop: 7}} onPress={handlePress}>
        Show less
      </Text>
    );
  }

  const RightContent = (
    spaceName: string,
    creatorId: string,
    title: string,
    content: string,
    spaceId: string,
    postId: string
  ) => (
    <View style={{ flexDirection: "column" }}>
      { userId === creatorId ?  (
        <View style={{ flexDirection: "row" }}>
          <IconButton
            style={{ alignSelf: "flex-end" }}
            icon="circle-edit-outline"
            onPress={() =>
              navigation.navigate("EditPostScreen", {
                title: title,
                content: content,
                postId: postId,
              })
            }
          />

          <IconButton
            icon="delete"
            onPress={() => {
              setpostIdDelete(postId);
              setPostDeleteDialog(true);
            }}
          />
        </View>
      ) : null}

      <Text style={{ marginTop: 5, marginRight: 5 }}>
         
        {
          <Button
            onPress={() => {
              navigation.navigate("GoToSpace", {
                id: spaceId,
              });
            }}
          >
            Go to Space
          </Button>
        }
      </Text>
    </View>
  );

  const renderPostCardItem = (item) => (
    <View style={{ flexDirection: "row" ,  }}>
      <Card
        style={{
          marginVertical: 10,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            flex:1,
            alignSelf: 'center',
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton
            icon="chevron-triple-up"
            size={20}
           
            onPress={async () => {
              if (item.item.voteStatus === 1) {
                return;
              }
              setLoadingState("updoot-loading");
              await voteMut({
                variables: {
                  postId: item.item.id,
                  value: 1,
                },
                update: (cache) => updateAfterVote(1 , item.item.id , cache)
              });
              setLoadingState("not-loading");
            }}
            color={item.item.voteStatus === 1 ? "green" : "black"}
            aria-label="updoot post"
          />

          <Text>{item.item.points}</Text>
          <IconButton
            icon="chevron-triple-down"
            size={20}
            
            onPress={async () => {
              if (item.item.voteStatus === -1) {
                return;
              }
              setLoadingState("downdoot-loading");
              await voteMut({
                variables: {
                  postId: item.item.id,
                  value: -1,
                },
                update: (cache) => updateAfterVote(-1 , item.item.id , cache)
              });
              setLoadingState("not-loading");
            }}
            color={item.item.voteStatus === -1 ? "red" : "black"}
            aria-label="downdoot post"
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
              item.item.id,
            )
          }
        />

        <Text style={{ margin: 10, color: "black" }}>{item.item.title}</Text>
        <ReadMore numberOfLines={4}  renderTruncatedFooter={_renderTruncatedFooter}  renderRevealedFooter={_renderRevealedFooter}  >
          <Text style={{ color: "black" , marginHorizontal: 10 , marginBottom:10 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis egestas neque. Aliquam sagittis lacinia enim, in tincidunt ligula lobortis ac. Vivamus hendrerit iaculis quam in elementum. Maecenas ut justo ullamcorper, faucibus orci eu, porta lacus. Nulla mattis ut elit a eleifend. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam auctor metus vitae magna accumsan, eget dictum metus euismod. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean lobortis mi arcu, at semper arcu convallis vel.

Vestibulum et ex nec quam vestibulum viverra. Nullam convallis lectus eget tellus semper gravida. Integer sodales elit nisi, vel porta ex cursus quis. Donec vel velit eros. Curabitur molestie et ex sit amet ullamcorper. Phasellus nisl sem, fringilla et vulputate quis, lobortis efficitur erat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec vehicula tempus eros quis hendrerit. Morbi neque eros, auctor at nibh et, tristique posuere odio. Vestibulum venenatis aliquam purus, et suscipit ex feugiat a.

Etiam id ipsum malesuada, molestie dolor eu, pharetra erat. Mauris at erat purus. Curabitur sed egestas mi. Aliquam tristique imperdiet interdum. Ut suscipit, nisi ac mollis semper, ipsum odio gravida sapien, et sagittis nunc ipsum eu massa. Etiam eros ante, malesuada a molestie quis, porttitor id orci. Mauris fermentum ex euismod augue vulputate imperdiet. Donec faucibus dictum turpis vel hendrerit. Proin luctus dapibus neque, non lobortis velit euismod vitae. Curabitur fringilla erat eu maximus auctor. Etiam placerat vehicula nisi, a tincidunt urna finibus non. Suspendisse et orci fringilla leo porttitor porttitor.
          </Text>
           </ReadMore>
       
      </Card>
    </View>
  );

  return (
    <View style={{ flex: 1, width: "100%" }}>
      {data?.getFeedPosts == null ? (
        <View style={{ alignSelf: 'center' }}>
          <Card style={{ margin: 10 , flexDirection: 'column' , padding: 10}}>
          <IconButton
    icon="block-helper"
    color={Colors.red500}
    size={100}
    onPress={() => {}}
  />
            <Text>No Posts Available</Text>
            <Text>Follow Some Spaces To get Posts on Your Feed</Text>
          </Card>
           </View>
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
            data={data?.getFeedPosts.posts}
            keyExtractor={(item) => item.id}
            renderItem={renderPostCardItem}
          />

          { (data && data.getFeedPosts.hasMore === true) ? (
            <View>
              <Button
                icon="arrow-down-drop-circle"
                onPress={() => {
                  setLimitPost(limitPost + 10);
                  fetchMore({
                    limit: limitPost,
                    cursor: null,
                  });
                }}
              >
                Load More
              </Button>
            </View>
          ) : null}
        </ScrollView>
      )}

      <Provider>
        <Portal>
          <Dialog visible={postDeletingLoading} onDismiss={() => {}}>
            <Dialog.Content>
              <View style={{ flexDirection: "row" }}>
                <ActivityIndicator />
                <Text style={{ marginLeft: 5, fontSize: 20 }}>
                  Deleting Post...
                </Text>
              </View>
            </Dialog.Content>
          </Dialog>
        </Portal>
      </Provider>

      <Provider>
        <Portal>
          <Dialog visible={postDeleteDialog} onDismiss={() => {}}>
            <Dialog.Title>Delete Post</Dialog.Title>
            <Dialog.Content>
              <Paragraph>Are You Sure You Wanna Delete This Post?</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={deletePostHandler} color="blue">
                Yes
              </Button>
              <Button onPress={hidePostDeleteDialog} color="red">
                No
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </Provider>

      <Provider>
        <Portal>
          <Dialog visible={postDeleteSuccess} onDismiss={() => {}}>
            <Dialog.Title>Success</Dialog.Title>
            <Dialog.Content>
              <View style={{ flexDirection: "row", padding: 10 }}>
                <IconButton
                  onPress={() => {}}
                  icon="check"
                  color="green"
                  size={30}
                />
                <Text style={{ marginLeft: 5, fontSize: 20 }}>
                  Deleting Post...
                </Text>
              </View>
            </Dialog.Content>
          </Dialog>
        </Portal>
      </Provider>

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
