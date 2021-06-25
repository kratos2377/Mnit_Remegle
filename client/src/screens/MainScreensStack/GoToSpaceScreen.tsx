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
  Snackbar,
  Portal,
  Dialog,
  Provider,
} from "react-native-paper";
import {
  useCreateSpaceMutation,
  useDeletePostMutation,
  useDeleteSpaceMutation,
  useFollowSpaceMutation,
  useGetPostsOfSpacesQuery,
  useGetSpaceDetailsQuery,
  useUnFollowSpaceMutation,
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
  
  const [spaceDeleteLoading , setSpaceDeleteLoading] = useState(false);
  
  const [deleteSpaceDialog , setDeleteSpaceDialog] = useState(false)
  const [spaceDeleteName , setSpaceDeleteName] = useState("")
  const [spaceDeleteId , setSpaceDeleteId] = useState("")
  const [successDelete , setSuccessDelete] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [following, setFollowing] = useState(false);
  const [followSpace] = useFollowSpaceMutation();
  const [unFollowSpace] = useUnFollowSpaceMutation();
  const [deleteSpace] = useDeleteSpaceMutation()
  const [postDeletingLoading ,setPostDeletingLoading]= useState(false)
  const [postDeleteDialog , setPostDeleteDialog] = useState(false);
  const [postDeleteSuccess , setPostDeleteSuccess] = useState(false);
  const [postIdDelete , setpostIdDelete] = useState("")
  const [postDelete] = useDeletePostMutation()

  const hidePostDeleteDialog = () => setPostDeleteDialog(false)
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

const hideSpaceDialog = () => setDeleteSpaceDialog(false)

  const [snackVisible, setSnackVisible] = useState(false);
  const [display, setDisplay] = useState<"Post" | "User">("Post");
  const [voteMut] = useVoteMutation();
  const[spaceDeleteLoadingError , setSpaceDeleteLoadingError] = useState(false);
  const [loadingState, setLoadingState] =
    useState<"updoot-loading" | "downdoot-loading" | "not-loading">(
      "not-loading"
    );
 const[userId , setUserId] = useState("")

  const deleteSpaceHandler = async () => {

    if(userId !== data?.getSpaceDetails.adminId){
      setSpaceDeleteLoadingError(true)
      return;
    }

    setSpaceDeleteLoading(true)
   const response = await deleteSpace({
     variables: {
       spaceId: data?.getSpaceDetails?.spaceId
     }
   })
  
   setSpaceDeleteLoading(false)

   if(!(response.data?.deleteSpace?.boolResult?.value)){

   }

   setSuccessDelete(true)

   setInterval(() => {
    setSuccessDelete(false)
    navigation.pop()
   } ,  1000)

   

 }

 const deletePostHandler = async () => {

  setPostDeletingLoading(true)
  setPostDeleteDialog(false)


  const response = await postDelete({
    variables:  {
      postId: postIdDelete
    }
  })

  if(!(response.data?.deletePost)){

  }

  setPostDeletingLoading(false)

  setPostDeleteSuccess(true)

  setInterval(() => {
    setPostDeleteSuccess(false)
  } , 1000)
  
}

  const onDismissSnackBar = () => setSnackVisible(false);

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
      setUserId(newData.id);
      for (var i = 0; i < data?.getSpaceDetails?.followingIds?.length; i++) {
        if (data?.getSpaceDetails.followingIds[i].id == newData.id) {
          setFollowing(true);
          setPageLoading(false);
          break;
        } 
      }

      setPageLoading(false)
    };

    getDetails();
  }, [data]);

  const hideSpaceDeleateLoadingError = () => setSpaceDeleteLoadingError(false)

  const LeftContentPost = (url: string) => (
    <Image
      style={{ width: 50, height: 50, borderRadius: 25 }}
      source={{ uri: url }}
    />
  );

  const RightContentPost = (
    spaceName: string,
    creatorId: string,
    title: string,
    content: string,
    spaceId: string,
    postId: string,
  ) => (
    <View>
      {userId === creatorId ? (
        <View style={{flexDirection:'row'}}>
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
    
              <IconButton icon="delete" onPress = {() =>  {
                setpostIdDelete(postId)
                setPostDeleteDialog(true)
              }} />
      </View>
      ) : null}

      <Text style={{ marginBottom: 10, marginRight: 5 }}>
         
        {
          <Button
            onPress={() => {
              navigation.navigate("GoToSpace", {
                id: spaceId,
              });
            }}
          >
            {spaceName}
          </Button>
        }
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
                  postId: item.item.id,
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
                  postId: item.item.id,
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
          left={() => LeftContentPost(item.item.creator.avatarUrl)}
          right={() =>
            RightContentPost(
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
        <Text style={{ color: "black" }}>{item.item.content}</Text>
      </Card>
    </View>
  );

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

  const unFollow = async () => {
    const response = await unFollowSpace({
      variables: {
        spaceId: data?.getSpaceDetails.spaceId,
      },
    });
    if (response?.data?.unfollowSpace) {
      setFollowing(false);
    } else {
      setSnackVisible(true);
    }
    console.log(response);
  };

  const Follow = async () => {
    const response = await followSpace({
      variables: {
        spaceId: data?.getSpaceDetails.spaceId,
      },
    });

    if (response?.data?.followSpace) {
      setFollowing(true);
    } else {
      setSnackVisible(true);
    }
    console.log(response);
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
            <Appbar.Action
              icon="postage-stamp"
              onPress={() =>
                navigation.navigate("CreatePost", {
                  spaceName: data?.getSpaceDetails.spaceName,
                })
              }
            />
        {
          userId === data?.getSpaceDetails.adminId ?     <Appbar.Action
          icon="delete"
          onPress={deleteSpaceHandler}
        /> : null
        }
        {
          userId === data?.getSpaceDetails.adminId ?     <Appbar.Action
          icon="square-edit-outline"
          onPress={() => {}}
        /> : null
        }
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
              Spaces
            </Button>
            <Button icon="account" onPress={() => setDisplay("User")}>
              Users
            </Button>
          </View>
          {display === "Post" ? (
            <FlatList
              numColumns={1}
              data={postData?.getPostsofSpace}
              keyExtractor={(item) => item.id}
              renderItem={renderPostCardItem}
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

<Provider>
<Portal>
        <Dialog visible={deleteSpaceDialog} onDismiss={hideSpaceDialog}>
          <Dialog.Title>Delete Space</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Are You Sure You Want To Delete {spaceDeleteName} Space</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={deleteSpaceHandler}>Yes</Button>
            <Button onPress={hideSpaceDialog}>No</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
  </Provider>

  <Provider>
<Portal>
        <Dialog visible={spaceDeleteLoadingError} onDismiss={() => {}}>
          <Dialog.Content>
            <View style={{flexDirection: 'row'}}>
              <ActivityIndicator/>
              <Text style={{marginLeft: 5 , fontSize: 20}}>You Are Not Admin Of Space</Text>
            </View>
          </Dialog.Content>
          <Dialog.Actions> 
          <Button onPress={hideSpaceDeleateLoadingError}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
  </Provider>



<Provider>
<Portal>
        <Dialog visible={spaceDeleteLoading} onDismiss={() => {}}>
          <Dialog.Content>
            <View style={{flexDirection: 'row'}}>
              <ActivityIndicator/>
              <Text style={{marginLeft: 5 , fontSize: 20}}>Deleting Space...</Text>
            </View>
          </Dialog.Content>
        </Dialog>
      </Portal>
  </Provider>

<Provider>
<Portal>
        <Dialog visible={successDelete} onDismiss={() => {}}>
          <Dialog.Content>
            <View style={{flexDirection: 'row'}}>
              <IconButton onPress={() => {}} icon="check" color='green' />
              <Text style={{marginLeft: 5 , fontSize: 20}}>Space Delete Successfully</Text>
            </View>
          </Dialog.Content>
        </Dialog>
      </Portal>
  </Provider>

  <Provider>
      <Portal>
        <Dialog visible={postDeletingLoading} onDismiss={() => {}}>
          <Dialog.Content>
            <View style={{flexDirection: 'row'}}>
           <ActivityIndicator />
           <Text style={{marginLeft:5 , fontSize: 20}}>Deleting Post...</Text>
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
            <Button onPress={deletePostHandler} color='blue'>Yes</Button>
            <Button onPress={hidePostDeleteDialog} color='red'>No</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      </Provider>

      <Provider>
      <Portal>
        <Dialog visible={postDeleteSuccess} onDismiss={() => {}}>
          <Dialog.Title>Success</Dialog.Title>
          <Dialog.Content>
            <View style={{flexDirection: 'row' , padding:10}}>
           <IconButton onPress={() => {}} icon="check" color="green" size={30} />
           <Text style={{marginLeft:5 , fontSize: 20}}>Deleting Post...</Text>
            </View>
          </Dialog.Content>
        </Dialog>
      </Portal>
      </Provider>

      <Provider>
        <Portal>
          <Dialog visible={snackVisible} onDismiss={onDismissSnackBar}>
            <Dialog.Title>Error..!</Dialog.Title>
            <Dialog.Content>
              <Paragraph>
                You Are The Admin of the Space. You Cannot Leave This Space
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={onDismissSnackBar}>Ok</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </Provider>
    </View>
  );
};
