import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import {
  Appbar,
  Button,
  Card,
  Colors,
  Dialog,
  IconButton,
  List,
  Modal,
  Paragraph,
  Portal,
  Provider
} from 'react-native-paper';
import { SocialIcon } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Linking from 'expo-linking';
import {
  useDeletePostMutation,
  useGetAllUserPostsQuery,
  useMeQuery,
  useUpdateAvatarUrlMutation,
  useVoteMutation
} from '../../generated/graphql';
import { MainNavProps } from '../../utils/MainParamList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateAfterVote } from '../../functions/updateAfterVote';
import ReadMore from 'react-native-read-more-text';
import * as ImagePicker from 'expo-image-picker';
import { v4 as uuidv4 } from 'uuid';
import firebase from 'firebase/app';
import { updateAfterUserAvatar } from '../../functions/updateAfterUserAvatar';
require('firebase/firestore');
require('firebase/firebase-storage');

interface ProfileScreenProps {}

export const ProfileScreen = ({ navigation }: MainNavProps<'Profile'>) => {
  const { data, error, variables } = useGetAllUserPostsQuery();
  const { data: userData, error: userError } = useMeQuery();

  const [voteMut] = useVoteMutation();
  const [loadingState, setLoadingState] = useState<
    'updoot-loading' | 'downdoot-loading' | 'not-loading'
  >('not-loading');

  const [userId, setUserId] = useState('');
  const [postDeletingLoading, setPostDeletingLoading] = useState(false);
  const [postDeleteDialog, setPostDeleteDialog] = useState(false);
  const [postDeleteSuccess, setPostDeleteSuccess] = useState(false);
  const [postIdDelete, setpostIdDelete] = useState('');
  const [postDelete] = useDeletePostMutation();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [modal, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [modalOptions, setModalOptions] = useState(false);
  const [updateUserAvatarUrl] = useUpdateAvatarUrlMutation();

  useEffect(() => {
    const getDetails = async () => {
      const userData = await AsyncStorage.getItem('userData');

      const newData = JSON.parse(userData);

      setUserId(newData.id);
    };

    setWidth(Dimensions.get('window').width);
    setHeight(Dimensions.get('window').height);

    getDetails();
  }, []);

  const hideOptionsModal = () => setModalOptions(false);
  const hidePostDeleteDialog = () => setPostDeleteDialog(false);

  const deletePostHandler = async () => {
    setPostDeletingLoading(true);
    setPostDeleteDialog(false);

    const response = await postDelete({
      variables: {
        postId: postIdDelete
      },
      update: (cache) => {
        cache.evict({ id: 'Post:' + postIdDelete });
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

  const LeftContent = (url: string) => (
    <Image
      style={{ width: 50, height: 50, borderRadius: 25 }}
      source={{ uri: url }}
    />
  );

  const _renderTruncatedFooter = (handlePress) => {
    return (
      <Text
        style={{ color: Colors.purple400, marginTop: 7 }}
        onPress={handlePress}
      >
        Show more
      </Text>
    );
  };

  const _renderRevealedFooter = (handlePress) => {
    return (
      <Text
        style={{ color: Colors.purple400, marginTop: 7 }}
        onPress={handlePress}
      >
        Show less
      </Text>
    );
  };

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
        <View style={{ flexDirection: 'row' }}>
          <IconButton
            style={{ alignSelf: 'flex-end' }}
            icon="circle-edit-outline"
            onPress={() =>
              navigation.navigate('EditPostScreen', {
                title: title,
                content: content,
                postId: postId
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

      <Text style={{ marginBottom: 10, marginRight: 5 }}>
         
        {
          <Button
            onPress={() => {
              navigation.navigate('GoToSpace', {
                id: spaceId
              });
            }}
          >
            Go To Space
          </Button>
        }
      </Text>
    </View>
  );
  const renderPostCardItem = (item) => (
    <View style={{ flexDirection: 'row' }}>
      <Card
        style={{
          marginVertical: 10
        }}
      >
        <View
          style={{
            flexDirection: 'column',
            flex: 1,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <IconButton
            icon="chevron-triple-up"
            size={20}
            color={item.item.voteStatus === 1 ? 'green' : 'black'}
            onPress={async () => {
              if (item.item.voteStatus === 1) {
                return;
              }
              setLoadingState('updoot-loading');
              await voteMut({
                variables: {
                  postId: item.item.id,
                  value: 1
                },
                update: (cache) => updateAfterVote(1, item.item.id, cache)
              });
              setLoadingState('not-loading');
            }}
          />

          <Text>{item.item.points}</Text>
          <IconButton
            icon="chevron-triple-down"
            size={20}
            color={item.item.voteStatus === -1 ? 'red' : 'black'}
            onPress={async () => {
              if (item.item.voteStatus === -1) {
                return;
              }
              setLoadingState('downdoot-loading');
              await voteMut({
                variables: {
                  postId: item.item.id,
                  value: -1
                },
                update: (cache) => updateAfterVote(-1, item.item.id, cache)
              });
              setLoadingState('not-loading');
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
              item.item.id
            )
          }
        />

        <Text style={{ margin: 10, color: 'black' }}>{item.item.title}</Text>
        <ReadMore
          numberOfLines={4}
          renderTruncatedFooter={_renderTruncatedFooter}
          renderRevealedFooter={_renderRevealedFooter}
        >
          <Text
            style={{ color: 'black', marginHorizontal: 10, marginBottom: 10 }}
          >
            {item.item.content}
          </Text>
        </ReadMore>

        <View
          style={{
            flexDirection: 'column',
            alignSelf: 'center',
            marginTop: 20
          }}
        >
          {item.item.imageUrl.length != 0 ? (
            <Image
              source={{ uri: item.item.imageUrl }}
              style={{
                height: height * 0.5,
                width: width * 0.8,
                marginBottom: 10
              }}
            />
          ) : (
            <View></View>
          )}
        </View>
      </Card>
    </View>
  );

  const updateImageUrl = async (url: string) => {
    const response = await updateUserAvatarUrl({
      variables: {
        userId: userId,
        avatarUrl: url
      },
      update: (cache) => updateAfterUserAvatar(userId, url, cache)
    });

    if (response.data?.updateAvatarUrl) {
      return;
    }
  };

  const uploadImage = async (image) => {
    let photoId = uuidv4();
    const childPath = `dp/${userId}/${photoId}`;
    const response = await fetch(image);
    const blob = await response.blob();

    const task = await firebase.storage().ref().child(childPath).put(blob);

    let url = await task.ref.getDownloadURL();
    await updateImageUrl(url);
    setImageUrl(url);
  };

  const containerStyle = { backgroundColor: 'white', padding: 20, margin: 20 };

  const pickImageGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    });
    setModalOptions(false);

    if (!result.cancelled) {
      setImage(result.uri);
      setPhotoUploading(true);
      await uploadImage(result.uri);
      // stop loading

      setPhotoUploading(false);
    }
  };

  const pickImageCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    });
    setModalOptions(false);

    if (!result.cancelled) {
      setImage(result.uri);
      setPhotoUploading(true);
      await uploadImage(result.uri);
      // stop loading
      setPhotoUploading(false);
    }
  };

  return (
    <ScrollView>
      <View style={{ flex: 1, width: '100%' }}>
        <ScrollView>
          <Appbar.Header style={{ backgroundColor: 'white' }}>
            <Appbar.Content
              title={userData?.me?.username}
              subtitle={userData?.me.studentId}
            />
            <Appbar.Action
              icon="dots-vertical-circle"
              onPress={() => navigation.navigate('Settings')}
            />
          </Appbar.Header>

          <View style={{ marginBottom: 10, marginTop: 10 }}>
            <Card
              style={{
                width: '100%',
                padding: 10,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <View style={{ alignSelf: 'center' }}>
                <Image
                  style={{ width: 200, height: 200, borderRadius: 100 }}
                  source={{ uri: userData?.me?.avatarUrl }}
                />
              </View>
              <View style={{ alignSelf: 'center' }}>
                <Text style={{ marginBottom: 10, marginTop: 10 }}>
                  {userData?.me?.fullName}
                </Text>
                <Text style={{ marginBottom: 10 }}>{userData?.me?.bio}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  marginBottom: 10
                }}
              >
                {userData?.me?.instagramAcc.length === 0 ? null : (
                  <SocialIcon
                    type="instagram"
                    onPress={() => Linking.openURL(userData?.me?.instagramAcc)}
                  />
                )}
                {userData?.me?.twitterAcc.length === 0 ? null : (
                  <SocialIcon
                    type="twitter"
                    onPress={() => Linking.openURL(userData?.me?.twitterAcc)}
                  />
                )}
              </View>

              <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <Button onPress={() => setModalOptions(true)}>Change DP</Button>
              </View>
            </Card>
          </View>
          {data?.getAllUserPosts?.length === 0 ? (
            <View style={{ alignSelf: 'center' }}>
              <Card
                style={{ margin: 10, flexDirection: 'column', padding: 10 }}
              >
                <IconButton
                  icon="block-helper"
                  color={Colors.red500}
                  size={100}
                  onPress={() => {}}
                />
                <Text>You Have No Posts</Text>
              </Card>
            </View>
          ) : (
            <View style={{ flex: 1 }}>
              <FlatList
                data={data?.getAllUserPosts}
                keyExtractor={(item) => item.id}
                renderItem={renderPostCardItem}
              />
            </View>
          )}
        </ScrollView>

        <Provider>
          <Portal>
            <Dialog visible={postDeletingLoading} onDismiss={() => {}}>
              <Dialog.Content>
                <View style={{ flexDirection: 'row' }}>
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
            <Modal
              visible={modalOptions}
              onDismiss={hideOptionsModal}
              contentContainerStyle={containerStyle}
            >
              <List.Item
                onPress={pickImageGallery}
                title="Gallery"
                description="Take Media Form Gallery"
                left={(props) => <List.Icon {...props} icon="folder-image" />}
              />

              <List.Item
                onPress={pickImageCamera}
                title="Camera"
                description="Take Media From Camera"
                left={(props) => <List.Icon {...props} icon="camera" />}
              />
            </Modal>
          </Portal>
        </Provider>

        <Provider>
          <Portal>
            <Dialog
              style={{ justifyContent: 'center' }}
              visible={photoUploading}
              onDismiss={() => {}}
            >
              <Dialog.Content>
                <View style={{ flexDirection: 'row', padding: 10 }}>
                  <ActivityIndicator />
                  <Text style={{ marginLeft: 10 }}>Uploading Image...</Text>
                </View>
              </Dialog.Content>
            </Dialog>
          </Portal>
        </Provider>

        <Provider>
          <Portal>
            <Dialog visible={postDeleteSuccess} onDismiss={() => {}}>
              <Dialog.Title>Success</Dialog.Title>
              <Dialog.Content>
                <View style={{ flexDirection: 'row', padding: 10 }}>
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
      </View>
    </ScrollView>
  );
};
