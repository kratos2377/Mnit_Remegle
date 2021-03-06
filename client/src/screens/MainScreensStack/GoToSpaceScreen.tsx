import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView
} from 'react-native';
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
  Colors,
  Modal,
  List
} from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import {
  GetSpaceDetailsDocument,
  GetSpaceDetailsQuery,
  useDeletePostMutation,
  useDeleteSpaceMutation,
  useFollowSpaceMutation,
  useGetPostsOfSpacesQuery,
  useGetSpaceDetailsQuery,
  useIsAdminOfSpaceMutation,
  useUnFollowSpaceMutation,
  useUpdateSpaceAvatarUrlMutation,
  useVoteMutation
} from '../../generated/graphql';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'react-native';
import { MainNavProps } from '../../utils/MainParamList';
import { Avatar, ListItem } from 'react-native-elements';
import { updateAfterVote } from '../../functions/updateAfterVote';
import ReadMore from 'react-native-read-more-text';
import firebase from 'firebase/app';
require('firebase/firestore');
require('firebase/firebase-storage');
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';
import { updateAfterSpaceAvatar } from '../../functions/updateSpaceAvatar';
import { SafeAreaView } from 'react-native-safe-area-context';
import gql from 'graphql-tag';
import { GET_SPACE_DETAILS } from '../../cache-queries-mutations/cacheQueriesMutations';

interface GoToSpaceScreenProps {}

export const GoToSpaceScreen = ({
  navigation,
  route
}: MainNavProps<'GoToSpace'>) => {
  const [spaceDeleteLoading, setSpaceDeleteLoading] = useState(false);

  const [deleteSpaceDialog, setDeleteSpaceDialog] = useState(false);
  const [spaceDeleteName, setSpaceDeleteName] = useState('');
  const [spaceDeleteId, setSpaceDeleteId] = useState('');
  const [successDelete, setSuccessDelete] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [following, setFollowing] = useState(false);
  const [followSpace] = useFollowSpaceMutation();
  const [unFollowSpace] = useUnFollowSpaceMutation();
  const [deleteSpace] = useDeleteSpaceMutation();
  const [postDeletingLoading, setPostDeletingLoading] = useState(false);
  const [postDeleteDialog, setPostDeleteDialog] = useState(false);
  const [postDeleteSuccess, setPostDeleteSuccess] = useState(false);
  const [postIdDelete, setpostIdDelete] = useState('');
  const [postDelete] = useDeletePostMutation();
  const [userBanned, setuserBanned] = useState(false);

  const hidePostDeleteDialog = () => setPostDeleteDialog(false);
  const { data: postData, loading: postLoading } = useGetPostsOfSpacesQuery({
    variables: {
      postSpaceId: route?.params.id
    }
  });

  const { data, loading } = useGetSpaceDetailsQuery({
    variables: {
      spaceId: route?.params.id
    }
  });

  const hideSpaceDialog = () => setDeleteSpaceDialog(false);

  const [snackVisible, setSnackVisible] = useState(false);
  const [display, setDisplay] = useState<'Post' | 'User'>('Post');
  const [voteMut] = useVoteMutation();
  const [dataSetting, setDataSetting] = useState(true);
  const [spaceDeleteLoadingError, setSpaceDeleteLoadingError] = useState(false);
  const [loadingState, setLoadingState] = useState<
    'updoot-loading' | 'downdoot-loading' | 'not-loading'
  >('not-loading');
  const [userId, setUserId] = useState('');
  const [followingLength, setFollowingLength] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [modal, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [updateSpaceAvatar] = useUpdateSpaceAvatarUrlMutation();
  const [spaceUsers, setSpaceUsers] = useState([]);
  const [statusChanging, setStatusChanging] = useState(false);
  const [isAdmin] = useIsAdminOfSpaceMutation();

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

  const onDismissSnackBar = () => setSnackVisible(false);
  const showOptionsModal = () => setModalVisible(true);
  const hideOptionsModal = () => setModalVisible(false);

  const RightContent = (followers: number) => <Text>Users: {followers}</Text>;

  const LeftContent = (url: string) => (
    <Image
      style={{ width: 40, height: 40, borderRadius: 20 }}
      source={{ uri: url }}
    />
  );

  useEffect(() => {
    const getDetails = async () => {
      setSpaceUsers([...data?.getSpaceDetails?.followingIds]);
      const userData = await AsyncStorage.getItem('userData');
      const newData = JSON.parse(userData);
      setUserId(newData.id);
      setFollowingLength(data?.getSpaceDetails.followingIds.length);
      for (var i = 0; i < data.getSpaceDetails.bannedUserIds.length; i++) {
        if (data?.getSpaceDetails.bannedUserIds[i] == newData.id) {
          setuserBanned(true);
          break;
        }
      }
      for (var i = 0; i < data?.getSpaceDetails?.followingIds?.length; i++) {
        if (data?.getSpaceDetails.followingIds[i].id == newData.id) {
          setFollowing(true);
          setPageLoading(false);
          setDataSetting(false);
          break;
        }
      }

      setPageLoading(false);
      setDataSetting(false);
    };
    setWidth(Dimensions.get('window').width);
    setHeight(Dimensions.get('window').height);

    getDetails();
  }, [data]);

  const hideSpaceDeleateLoadingError = () => setSpaceDeleteLoadingError(false);

  const LeftContentPost = (url: string) => (
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

  const RightContentPost = (
    spaceName: string,
    creatorId: string,
    title: string,
    content: string,
    spaceId: string,
    postId: string
  ) => (
    <View>
      {userId === creatorId ? (
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
    </View>
  );

  const renderPostCardItem = (item) => (
    <View style={{ flexDirection: 'column' }}>
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

      <Card
        style={{
          marginBottom: 10,
          marginHorizontal: 5
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-evenly'
          }}
        >
          <IconButton
            icon="thumb-up"
            size={20}
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
            color={item.item.voteStatus === 1 ? 'green' : 'black'}
            aria-label="updoot post"
          />

          <Text>{item.item.points}</Text>
          <IconButton
            icon="thumb-down"
            size={20}
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
            color={item.item.voteStatus === -1 ? 'red' : 'black'}
            aria-label="downdoot post"
          />
        </View>
      </Card>
    </View>
  );

  const renderUserItem = (item) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('GoToProfile', {
          id: item.item.id
        })
      }
    >
      <View style={{ margin: 10 }}>
        <ListItem key={item.item.id} bottomDivider>
          <Avatar source={{ uri: item.item.avatarUrl }} />
          <ListItem.Content>
            <ListItem.Title style={{ color: 'black' }}>
              {item.item.fullName}
            </ListItem.Title>
            <ListItem.Subtitle>{item.item.studentId}</ListItem.Subtitle>
          </ListItem.Content>
          <Button>Ban User</Button>
        </ListItem>
      </View>
    </TouchableOpacity>
  );

  const containerStyle = { backgroundColor: 'white', padding: 20, margin: 20 };

  const unFollow = async () => {
    setStatusChanging(true);

    const adminResponse = await isAdmin({
      variables: {
        spaceId: data?.getSpaceDetails.id
      }
    });

    if (adminResponse.data?.isAdminOfSpace) {
      setSnackVisible(true);
      setStatusChanging(false);
      return;
    }

    const response = await unFollowSpace({
      variables: {
        spaceId: data?.getSpaceDetails.id
      },
      update: (cache) => {
        //updateAfterUnfollowSpace(data?.getSpaceDetails.id, userId, cache)

        const spaceStore = cache.readQuery({
          query: GET_SPACE_DETAILS,
          variables: {
            spaceId: data?.getSpaceDetails.id
          }
        });

        const newItem = spaceStore.getSpaceDetails.followingIds.filter(
          (item) => item.id !== userId
        );
        setSpaceUsers([...newItem]);
        cache.writeQuery({
          query: GET_SPACE_DETAILS,
          variables: {
            spaceId: data?.getSpaceDetails.id
          },
          data: {
            followingIds: [...newItem]
          }
        });
      }
    });
    setStatusChanging(false);
    if (response?.data?.unfollowSpace) {
      setFollowing(false);
      setFollowingLength(followingLength - 1);
    } else {
      setSnackVisible(true);
    }
  };

  const Follow = async () => {
    setStatusChanging(true);
    const response = await followSpace({
      variables: {
        spaceId: data?.getSpaceDetails.id
      },

      update: (cache) => {
        const spaceStore = cache.readQuery({
          query: GET_SPACE_DETAILS,
          variables: {
            spaceId: data?.getSpaceDetails.id
          }
        });
        setSpaceUsers([...spaceStore.getSpaceDetails.followingIds]);
        cache.writeQuery({
          query: GET_SPACE_DETAILS,
          variables: {
            spaceId: data?.getSpaceDetails.id
          },
          data: {
            followingIds: [...spaceStore.getSpaceDetails.followingIds]
          }
        });
      }
    });
    setStatusChanging(false);
    if (response?.data?.followSpace) {
      setFollowing(true);
      setFollowingLength(followingLength + 1);
    } else {
      setSnackVisible(true);
    }
  };

  const updateSpace = async (url: string) => {
    await updateSpaceAvatar({
      variables: {
        spaceId: route?.params?.id,
        spaceAvatarUrl: url
      },
      update: (cache) => updateAfterSpaceAvatar(route.params?.id, url, cache)
    });
  };

  const uploadImage = async (image: string) => {
    let photoId = uuid.v4();
    const childPath = `spaceDP/${userId}/${photoId}`;
    const response = await fetch(image);
    const blob = await response.blob();

    const task = await firebase.storage().ref().child(childPath).put(blob);

    let url = await task.ref.getDownloadURL();
    await updateSpace(url);
    setImageUrl(url);
  };

  const pickImageGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    });
    setModalVisible(false);

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
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    });
    setModalVisible(false);

    if (!result.cancelled) {
      setImage(result.uri);
      setPhotoUploading(true);
      await uploadImage(result.uri);
      // stop loading
      setPhotoUploading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, width: '100%' }}>
        {loading || postLoading || dataSetting ? (
          <ActivityIndicator style={{ justifyContent: 'center' }} />
        ) : (
          <ScrollView style={{ width: '100%' }}>
            <Appbar.Header style={{ backgroundColor: 'white' }}>
              <Appbar.BackAction onPress={() => navigation.pop()} />
              <Appbar.Content title={data?.getSpaceDetails.spaceName} />
              {userId === data?.getSpaceDetails.adminId ? (
                <IconButton
                  icon={(props) => (
                    <Feather name="aperture" size={20} color="black" />
                  )}
                  onPress={showOptionsModal}
                />
              ) : null}
              {following ? (
                <Appbar.Action
                  size={20}
                  icon="postage-stamp"
                  onPress={() =>
                    navigation.navigate('CreatePost', {
                      spaceName: data?.getSpaceDetails.spaceName
                    })
                  }
                />
              ) : null}
              {userId === data?.getSpaceDetails.adminId ? (
                <Appbar.Action
                  size={20}
                  icon="delete"
                  onPress={() => setDeleteSpaceDialog(true)}
                />
              ) : null}
              {userId === data?.getSpaceDetails.adminId ? (
                <Appbar.Action
                  size={20}
                  icon="square-edit-outline"
                  onPress={() =>
                    navigation.navigate('EditSpaceScreen', {
                      spaceId: data?.getSpaceDetails.id,
                      spaceName: data?.getSpaceDetails.spaceName,
                      spaceDescription: data?.getSpaceDetails.spaceDescription
                    })
                  }
                />
              ) : null}
              {statusChanging ? (
                <ActivityIndicator size="small" />
              ) : following ? (
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
                right={() => RightContent(followingLength)}
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
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'space-around'
              }}
            >
              <Button icon="postage-stamp" onPress={() => setDisplay('Post')}>
                Posts
              </Button>
              <Button icon="account" onPress={() => setDisplay('User')}>
                Users
              </Button>
            </View>
            {display === 'Post' ? (
              <FlatList
                numColumns={1}
                data={postData?.getPostsofSpace}
                keyExtractor={(item) => item.id}
                renderItem={renderPostCardItem}
              />
            ) : (
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginHorizontal: 10,
                    justifyContent: 'space-evenly',
                    alignSelf: 'stretch'
                  }}
                >
                  {userId === data?.getSpaceDetails.adminId ? (
                    <Button
                      icon="bandage"
                      color={Colors.purple500}
                      onPress={() => {}}
                    >
                      Banned users
                    </Button>
                  ) : null}
                  {userId === data?.getSpaceDetails.adminId ? (
                    <Button
                      icon="magnify"
                      color={Colors.purple500}
                      onPress={() => {}}
                    >
                      Search Users
                    </Button>
                  ) : null}
                </View>
                <FlatList
                  numColumns={1}
                  data={spaceUsers}
                  keyExtractor={(item) => item.id}
                  renderItem={renderUserItem}
                />
              </View>
            )}
          </ScrollView>
        )}

        <Provider>
          <Portal>
            <Dialog visible={deleteSpaceDialog} onDismiss={hideSpaceDialog}>
              <Dialog.Title>Delete Space</Dialog.Title>
              <Dialog.Content>
                <Paragraph>
                  Are You Sure You Want To Delete this Space
                </Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button
                  onPress={() =>
                    navigation.replace('DeletingSpace', {
                      spaceId: data?.getSpaceDetails.id,
                      spaceFn: route.params.spaceFn
                    })
                  }
                >
                  Yes
                </Button>
                <Button onPress={hideSpaceDialog}>No</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </Provider>

        <Provider>
          <Portal>
            <Modal
              visible={modal}
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
            <Dialog visible={userBanned} onDismiss={() => {}}>
              <Dialog.Title>Alert</Dialog.Title>
              <Dialog.Content>
                <Paragraph>You Are Banned From This Space</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => navigation.pop()}>Leave</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </Provider>

        <Provider>
          <Portal>
            <Dialog visible={spaceDeleteLoadingError} onDismiss={() => {}}>
              <Dialog.Content>
                <View style={{ flexDirection: 'row' }}>
                  <ActivityIndicator />
                  <Text style={{ marginLeft: 5, fontSize: 20 }}>
                    You Are Not Admin Of Space
                  </Text>
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
                <View style={{ flexDirection: 'row' }}>
                  <ActivityIndicator />
                  <Text style={{ marginLeft: 5, fontSize: 20 }}>
                    Deleting Space...
                  </Text>
                </View>
              </Dialog.Content>
            </Dialog>
          </Portal>
        </Provider>

        <Provider>
          <Portal>
            <Dialog visible={successDelete} onDismiss={() => {}}>
              <Dialog.Content>
                <View style={{ flexDirection: 'row' }}>
                  <IconButton onPress={() => {}} icon="check" color="green" />
                  <Text style={{ marginLeft: 5, fontSize: 20 }}>
                    Space Delete Successfully
                  </Text>
                </View>
              </Dialog.Content>
            </Dialog>
          </Portal>
        </Provider>

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
    </SafeAreaView>
  );
};
