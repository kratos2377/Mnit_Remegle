import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  TextInput,
  StyleSheet,
  Image
} from 'react-native';
import {
  Appbar,
  Avatar,
  Button,
  Card,
  Dialog,
  List,
  Modal,
  Paragraph,
  Portal,
  Provider,
  Snackbar,
  Title
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase/app';
import { useCreatePostsMutation } from '../../generated/graphql';
import { MainNavProps } from '../../utils/MainParamList';
import { FlatList } from 'react-native-gesture-handler';
require('firebase/firestore');
require('firebase/firebase-storage');

interface CreatePostScreenFABProps {}

export const CreatePostScreenFAB = ({
  navigation,
  route
}: MainNavProps<'CreatePostFAB'>) => {
  const [spacesArray, setSpacesArray] = useState([]);
  const [visible, setVisible] = useState(false);
  const [snackVisible, setSnackVisible] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [createPost] = useCreatePostsMutation();
  const [modal, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [userId, setuserId] = useState('');
  const [photoUploading, setPhotoUploading] = useState(false);
  const [spaceName, setSpaceName] = useState('');
  const [spaceSelected, setSpaceSelected] = useState(false);
  const [spaceModal, setSpaceModal] = useState(false);

  useEffect(() => {
    setSpacesArray([...route.params.spaces]);
  }, []);

  const _goBack = () => {
    setVisible(true);
  };

  const _createPost = async () => {
    if (title.trim().length === 0) {
      setError('Title Cannot Be Empty');
      setShowError(true);
      return;
    }

    if (spaceName.trim().length === 0 || !spaceSelected) {
      setError('No Space Selected. Please Select a Space');
      setShowError(true);
      return;
    }

    setCreating(true);
    const response = await createPost({
      variables: {
        title: title,
        content: content,
        imageUrl: imageUrl.length === 0 || image === null ? '' : imageUrl,
        spaceName: spaceName
      },
      update: (cache, { data }) => {
        cache.evict({ fieldName: 'posts:{}' });

        // const postData = cache.readQuery<GetPostsOfSpacesQuery>({
        //   query: GetPostsOfSpacesDocument
        // });
        // console.log(postData);
        // //   cache.writeQuery<GetFeedPostsQuery>({
        // //     query: GetFeedPostsDocument,
        // //     data: {
        // //         posts: [...postData!.getFeedPosts , data!.createPosts]
        // //     }
        // //   })
      }
    });
    if (response.data?.createPosts == null) {
      console.log('Error');
    }
    setCreating(false);
    setSnackVisible(true);

    setTimeout(() => {
      setSnackVisible(false);
      navigation.pop();
    }, 1000);
  };

  const hideDialog = () => setVisible(false);
  const hideError = () => setShowError(false);
  const onDismissSnackBar = () => setVisible(false);

  const showOptionsModal = () => setModalVisible(true);
  const hideOptionsModal = () => setModalVisible(false);

  const hideSpaceModal = () => setSpaceModal(false);

  const containerStyle = { backgroundColor: 'white', padding: 20, margin: 20 };
  const containerSpaceModalStyle = {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    heigth: height * 0.8
  };

  useEffect(() => {
    setWidth(Dimensions.get('window').width);
    setHeight(Dimensions.get('window').height);

    const getUserId = async () => {
      const userData = await AsyncStorage.getItem('userData');

      const newData = JSON.parse(userData);

      setuserId(newData.id);
    };

    getUserId();
  }, []);

  const uploadImage = async (image: string) => {
    let photoId = uuid.v4();
    const childPath = `post/${userId}/${photoId}`;

    const response = await fetch(image);
    const blob = await response.blob();

    const task = await firebase.storage().ref().child(childPath).put(blob);

    let url = await task.ref.getDownloadURL();

    setImageUrl(url);
  };

  const pickImageGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      ImagesowsEditing: true,
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

  const RightContent = () => (
    <Button onPress={() => setSpaceModal(true)}>Choose Space</Button>
  );

  const LeftSpaceModalContent = (url: string) => (
    <Image
      style={{ width: 50, height: 50, borderRadius: 25 }}
      source={{ uri: url }}
    />
  );

  const spaceListRenderItem = (item: any) => (
    <View style={{ flex: 1 }}>
      <List.Item
        onPress={() => {
          setSpaceSelected(true);
          setSpaceName(item.item.spaceName);
          setSpaceModal(false);
        }}
        title={item.item.spaceName}
        left={() => LeftSpaceModalContent(item.item.spaceAvatarUrl)}
      />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, width: '100%' }}>
      <View style={{ flex: 1 }}>
        <Appbar.Header>
          <Appbar.BackAction onPress={_goBack} />
          <Appbar.Content title="Create Post" subtitle={''} />
          <Appbar.Action icon="file-image" onPress={showOptionsModal} />
          <Appbar.Action icon="check" onPress={_createPost} />
        </Appbar.Header>

        <ScrollView>
          <View style={{ margin: 5 }}>
            <Card style={{ marginVertical: 10, marginHorizontal: 5 }}>
              <Card.Title
                title={!spaceSelected ? 'No Space Selected:' : spaceName}
                right={RightContent}
              />
            </Card>
            <TextInput
              style={styles.inputContainer}
              multiline={true}
              numberOfLines={7}
              placeholder="Set Title"
              maxLength={100}
              onChangeText={(value) => setTitle(value)}
              value={title}
            />
            <Text
              style={{
                alignItems: 'flex-end',
                textAlign: 'right',
                marginRight: 5
              }}
            >
              {title.length}/100
            </Text>
          </View>
          <View style={{ marginVertical: 10, marginHorizontal: 2, padding: 5 }}>
            <TextInput
              style={styles.inputContainer}
              multiline={true}
              numberOfLines={15}
              placeholder="Set Content"
              maxLength={1000}
              onChangeText={(value) => setContent(value)}
              value={content}
            />
            <Text
              style={{
                alignItems: 'flex-end',
                textAlign: 'right',
                marginRight: 5
              }}
            >
              {content.length}/1000
            </Text>
          </View>

          <View style={{ flexDirection: 'column', alignSelf: 'center' }}>
            {image && (
              <Image
                source={{ uri: image }}
                style={{
                  width: width * 0.8,
                  height: height * 0.5,
                  marginBottom: 10
                }}
              />
            )}
            {image && (
              <Button
                onPress={() => {
                  setImage(null);
                  setImageUrl('');
                }}
              >
                Remove Image
              </Button>
            )}
          </View>
        </ScrollView>

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
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>Alert</Dialog.Title>
              <Dialog.Content>
                <Paragraph>
                  Do You Want To Cancel This Post and Go Back to Previous
                  Screen?
                </Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button
                  onPress={() => {
                    setTitle('');
                    setContent('');
                    navigation.pop();
                  }}
                >
                  Yes
                </Button>
                <Button onPress={hideDialog}>No</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </Provider>

        <Provider>
          <Portal>
            <Dialog visible={showError} onDismiss={hideError}>
              <Dialog.Title>Error</Dialog.Title>
              <Dialog.Content>
                <Paragraph>{error}</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideError}>OK</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </Provider>

        <Provider>
          <Portal>
            <Dialog
              style={{ justifyContent: 'center' }}
              visible={creating}
              onDismiss={() => {}}
            >
              <Dialog.Content>
                <View style={{ flexDirection: 'row', padding: 10 }}>
                  <ActivityIndicator />
                  <Text style={{ marginLeft: 10 }}>Creating Post...</Text>
                </View>
              </Dialog.Content>
            </Dialog>
          </Portal>
        </Provider>

        <Provider>
          <Portal>
            <Modal
              visible={spaceModal}
              onDismiss={hideSpaceModal}
              contentContainerStyle={containerStyle}
            >
              <View style={{ width: width * 0.9, height: height * 0.6 }}>
                <ScrollView style={{ flex: 1 }}>
                  <FlatList
                    data={spacesArray}
                    keyExtractor={(item) => item.id}
                    renderItem={spaceListRenderItem}
                  />
                </ScrollView>
              </View>
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

        <View>
          <Snackbar
            visible={snackVisible}
            onDismiss={onDismissSnackBar}
            action={{
              label: 'OK',
              onPress: () => {
                // Do something
              }
            }}
          >
            Post Created...!!
          </Snackbar>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    margin: 10,
    padding: 15,
    fontSize: 20,
    borderColor: '#000000',
    borderWidth: 2,
    borderRadius: 10
  },
  container: {
    flex: 1,
    justifyContent: 'space-between'
  }
});
