import React, { useState , useEffect} from "react";
import { FlatList, ScrollView, View, Text, Image, ActivityIndicator } from "react-native";
import { SocialIcon } from "react-native-elements";
import { Appbar, Button, Card, Dialog, IconButton, Paragraph, Portal, Provider } from "react-native-paper";
import {
  useDeletePostMutation,
  useGetPostsByUserIdQuery,
  useStudentDetailsQuery,
  useVoteMutation,
} from "../../generated/graphql";
import * as Linking from "expo-linking";
import { MainNavProps } from "../../utils/MainParamList";
import AsyncStorage from "@react-native-async-storage/async-storage";

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


  const [voteMut] = useVoteMutation();
  const [loadingState, setLoadingState] =
    useState<"updoot-loading" | "downdoot-loading" | "not-loading">(
      "not-loading"
    );

  
    const [postDeletingLoading ,setPostDeletingLoading]= useState(false)
  const [postDeleteDialog , setPostDeleteDialog] = useState(false);
  const [postDeleteSuccess , setPostDeleteSuccess] = useState(false);
  const [postIdDelete , setpostIdDelete] = useState("")
  const [postDelete] = useDeletePostMutation()
  const [userId , setUserId] = useState("")

  const hidePostDeleteDialog = () => setPostDeleteDialog(false)

    useEffect(() => {
      const getDetails = async () => {
        const userData = await AsyncStorage.getItem("userData");
  
        const newData = JSON.parse(userData);
  
       setUserId(newData.id);
      };
  
      getDetails();
    }, []);

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
            keyExtractor={(item) => item.id}
            renderItem={renderPostCardItem}
          />
        </View>
      </ScrollView>

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
    </View>
  );
};
