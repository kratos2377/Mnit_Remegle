import React, { useState, useEffect } from 'react';
import {
  FlatList,
  ScrollView,
  View,
  Text,
  Image,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import { SocialIcon } from 'react-native-elements';
import {
  Appbar,
  Button,
  Card,
  Colors,
  Dialog,
  IconButton,
  Paragraph,
  Portal,
  Provider
} from 'react-native-paper';
import {
  useDeletePostMutation,
  useGetPostsByUserIdQuery,
  useStudentDetailsQuery,
  useVoteMutation
} from '../../generated/graphql';
import * as Linking from 'expo-linking';
import { MainNavProps } from '../../utils/MainParamList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReadMore from 'react-native-read-more-text';
import { updateAfterVote } from '../../functions/updateAfterVote';
import { SafeAreaView } from 'react-native-safe-area-context';

interface GoToProfileScreenProps {}

export const GoToProfileScreen = ({
  navigation,
  route
}: MainNavProps<'GoToProfile'>) => {
  const { data, error, variables, loading } = useGetPostsByUserIdQuery({
    variables: {
      id: route.params?.id
    },
    notifyOnNetworkStatusChange: true
  });

  const {
    data: userData,
    error: userError,
    loading: detailsLoading
  } = useStudentDetailsQuery({
    variables: {
      id: route.params?.id
    }
  });

  const [voteMut] = useVoteMutation();
  const [loadingState, setLoadingState] = useState<
    'updoot-loading' | 'downdoot-loading' | 'not-loading'
  >('not-loading');

  const [postDeletingLoading, setPostDeletingLoading] = useState(false);
  const [postDeleteDialog, setPostDeleteDialog] = useState(false);
  const [postDeleteSuccess, setPostDeleteSuccess] = useState(false);
  const [postIdDelete, setpostIdDelete] = useState('');
  const [postDelete] = useDeletePostMutation();
  const [userId, setUserId] = useState('');
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const hidePostDeleteDialog = () => setPostDeleteDialog(false);

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

  const deletePostHandler = async () => {
    setPostDeletingLoading(true);
    setPostDeleteDialog(false);

    const response = await postDelete({
      variables: {
        postId: postIdDelete
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

      <Text style={{ marginBottom: 10, marginRight: 5 }}>
         
        {
          <Button
            onPress={() => {
              navigation.navigate('GoToSpace', {
                id: spaceId
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
    <View style={{ flexDirection: 'column' }}>
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, width: '100%' }}>
        {loading || detailsLoading ? (
          <ActivityIndicator />
        ) : (
          <ScrollView>
            <Appbar.Header style={{ backgroundColor: 'white' }}>
              <Appbar.BackAction onPress={() => navigation.pop()} />
              <Appbar.Content
                title={userData?.studentDetails?.username}
                subtitle={userData?.studentDetails?.studentId}
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
                    source={{ uri: userData?.studentDetails?.avatarUrl }}
                  />
                </View>
                <View style={{ alignSelf: 'center' }}>
                  <Text style={{ marginBottom: 10 }}>
                    {userData?.studentDetails?.fullName}
                  </Text>
                  <Text style={{ marginBottom: 10 }}>
                    {userData?.studentDetails?.bio}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    marginBottom: 10
                  }}
                >
                  {userData?.studentDetails?.instagramAcc.length ===
                  0 ? null : (
                    <SocialIcon
                      type="instagram"
                      onPress={() =>
                        Linking.openURL(
                          `https://www.instagram.com/${userData?.studentDetails?.instagramAcc}/`
                        )
                      }
                    />
                  )}
                  {userData?.studentDetails?.twitterAcc.length === 0 ? null : (
                    <SocialIcon
                      type="twitter"
                      onPress={() =>
                        Linking.openURL(
                          `https://twitter.com/${userData?.studentDetails?.twitterAcc}`
                        )
                      }
                    />
                  )}
                </View>
              </Card>
            </View>
            {data?.getPostsByUserId?.length === 0 ? (
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
                  <Text>Users Have No Posts</Text>
                </Card>
              </View>
            ) : (
              <View style={{ flex: 1 }}>
                <FlatList
                  numColumns={1}
                  data={data?.getPostsByUserId}
                  keyExtractor={(item) => item.id}
                  renderItem={renderPostCardItem}
                />
              </View>
            )}
          </ScrollView>
        )}

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
      </View>
    </SafeAreaView>
  );
};
