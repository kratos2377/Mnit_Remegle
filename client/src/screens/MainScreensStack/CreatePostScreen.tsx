import React , {useState} from 'react'
import { View , Text, TextInput , StyleSheet, ScrollView} from 'react-native';
import { ActivityIndicator, Appbar, Button, Dialog, Paragraph, Portal , Provider, Snackbar } from 'react-native-paper';
import { GetFeedPostsDocument, GetFeedPostsQuery, GetPostsOfSpacesDocument, GetPostsOfSpacesQuery, PostSnippetFragmentDoc, useCreatePostsMutation } from '../../generated/graphql';
import { MainNavProps } from '../../utils/MainParamList';

interface CreatePostScreenProps {

}

export const CreatePostScreen = ({ navigation , route}: MainNavProps<"CreatePost">) => {
  
    const[visible , setVisible] = useState(false)
    const [snackVisible , setSnackVisible] = useState(false)
    const [creating , setCreating] = useState(false)
    const [error , setError] = useState("")
    const [showError , setShowError] = useState(false)
    const [title , setTitle] = useState("")
    const [content , setContent] = useState("")

    const [createPost] = useCreatePostsMutation()

  const _goBack = () => {
   setVisible(true)
  }

  const _createPost =  async () => {
  setCreating(true)

  const response =await createPost({
      variables: {
         title: title,
         content: content,
         spaceName: route?.params.spaceName
      },
      update: (cache , {data}) => {
        cache.evict({ fieldName: "posts:{}" });

        const postData =  cache.readQuery<GetPostsOfSpacesQuery>({
          query: GetPostsOfSpacesDocument,
        })
      console.log(postData)
      // //   cache.writeQuery<GetFeedPostsQuery>({
      // //     query: GetFeedPostsDocument,
      // //     data: {
      // //         posts: [...postData!.getFeedPosts , data!.createPosts]
      // //     }
      // //   })
      }
  })
  if(response.data?.createPosts == null){
      console.log("Error")
  }
  setCreating(false)
  setSnackVisible(true)

  setTimeout(() => {
      setSnackVisible(false)
      navigation.pop()
  } , 1000)
   
  }

  const hideDialog = () => setVisible(false)
  const hideError = () => setShowError(false)
  const onDismissSnackBar = () => setVisible(false);

        return (
            <View>
                 <Appbar.Header style={{backgroundColor: 'white'}}>
      <Appbar.BackAction onPress={_goBack} />
      <Appbar.Content title="Create Post" />
      <Appbar.Action icon="file-image" onPress={() => {}} />
      <Appbar.Action icon="check" onPress={_createPost} />
    </Appbar.Header>
       <ScrollView>
       <View style={{margin:10}}>
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
          style={{ alignItems: "flex-end", textAlign: "right", marginRight: 5 }}
        >
          {title.length}/100
        </Text>
           </View>
           <View style={{margin:10 , padding: 10}}>
           <TextInput
          style={styles.inputContainer}
          multiline={true}
          numberOfLines={12}
          placeholder="Set Content"
          maxLength={600}
          onChangeText={(value) => setContent(value)}
          value={content}
        />
        <Text
          style={{ alignItems: "flex-end", textAlign: "right", marginRight: 5 }}
        >
          {content.length}/600
        </Text>
           </View>
            </ScrollView>


          <Provider>
          <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Do You Want To Cancel This Post and Go Back to Previous Screen?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => {
                setTitle("")
                setContent("")
                navigation.pop()
            }}>Yes</Button>
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

          
          <Provider >
          <Portal >
        <Dialog  style={{justifyContent: 'center'}} visible={creating} onDismiss={() => {}}>
          <Dialog.Content>
            <View style={{flexDirection: 'row' , padding: 10 }}>
                <ActivityIndicator />
                <Text style={{marginLeft: 10}}>Creating Post...</Text>
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
          },
        }}>
        Post Created...!!
      </Snackbar>
          </View>
        </View>

        );
}

const styles = StyleSheet.create({
    inputContainer: {
      margin: 10,
      padding: 15,
      fontSize: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
      },
  });
  