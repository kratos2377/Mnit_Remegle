import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Image
} from 'react-native';
import {
  ActivityIndicator,
  Appbar,
  Button,
  Dialog,
  List,
  Modal,
  Paragraph,
  Portal,
  Provider,
  Snackbar
} from 'react-native-paper';
import { Dimensions } from 'react-native';
import {
  GetPostsOfSpacesDocument,
  GetPostsOfSpacesQuery,
  useCreatePostsMutation,
  useUpdateSpaceAvatarUrlMutation
} from '../../generated/graphql';
import { MainNavProps } from '../../utils/MainParamList';
import * as ImagePicker from 'expo-image-picker';
import { v4 as uuidv4 } from 'uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase/app';
require('firebase/firestore');
require('firebase/firebase-storage');

interface CreatePostScreenProps {}

export const CreatePostScreen = ({
  navigation,
  route
}: MainNavProps<'CreatePost'>) => {
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

  const _goBack = () => {
    setVisible(true);
  };

  const _createPost = async () => {
    if (title.trim().length === 0) {
      setError('Title Cannot Be Empty');
      setShowError(true);
      return;
    }
    setCreating(true);
    const response = await createPost({
      variables: {
        title: title,
        content: content,
        imageUrl: imageUrl.length === 0 ? '' : imageUrl,
        spaceName: route?.params.spaceName
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

  const containerStyle = { backgroundColor: 'white', padding: 20, margin: 20 };

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

  const uploadImage = async (image) => {
    let photoId = uuidv4();
    const childPath = `post/${userId}/${photoId}`;
    const response = await fetch(image);
    const blob = await response.blob();

    const task = await firebase.storage().ref().child(childPath).put(blob);

    let url = await task.ref.getDownloadURL();

    setImageUrl(url);
  };

  const pickImageGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    setModalVisible(false);
    console.log(result);

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
      aspect: [4, 3],
      quality: 1
    });
    setModalVisible(false);
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      setPhotoUploading(true);
      await uploadImage(image);
      // stop loading
      setPhotoUploading(false);
    }
  };
  return (
    <View>
      <Appbar.Header style={{ backgroundColor: 'white' }}>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title="Create Post" />
        <Appbar.Action icon="file-image" onPress={showOptionsModal} />
        <Appbar.Action icon="check" onPress={_createPost} />
      </Appbar.Header>
      <ScrollView>
        <View style={{ margin: 10 }}>
          <TextInput
            style={styles.inputContainer}
            multiline={true}
            numberOfLines={5}
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
        <View style={{ margin: 10, padding: 10 }}>
          <TextInput
            style={styles.inputContainer}
            multiline={true}
            numberOfLines={12}
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
            <Button onPress={() => setImage(null)}>Remove Image</Button>
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
                Do You Want To Cancel This Post and Go Back to Previous Screen?
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
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    margin: 10,
    padding: 15,
    fontSize: 20
  },
  container: {
    flex: 1,
    justifyContent: 'space-between'
  }
});
