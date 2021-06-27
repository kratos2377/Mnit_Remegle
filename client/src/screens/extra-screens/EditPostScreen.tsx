import React, { useState, useEffect } from "react";
import { ScrollView, TextInput, View, Text, StyleSheet } from "react-native";
import {
    ActivityIndicator,
  Appbar,
  Button,
  Dialog,
  Paragraph,
  Portal,
  Provider,
} from "react-native-paper";
import { updateAfterPost } from "../../functions/updateAfterEditPost";
import { useUpdatePostMutation } from "../../generated/graphql";
import { MainNavProps } from "../../utils/MainParamList";

interface EditPostScreenProps {}

export const EditPostScreen = ({
  navigation,
  route,
}: MainNavProps<"EditPostScreen">) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [updateDialog , setUpdateDialog] = useState(false)
  const [errorDialog , setErrorDialog] = useState(false)
  const [postId , setPostId] = useState("")
  const [updateMut] = useUpdatePostMutation()

  useEffect(() => {
    setTitle(route?.params?.title);
    setContent(route?.params?.content);
    setPostId(route?.params?.postId)
  }, []);

  const _goBack = () => setVisible(true);

  const _updatePost = async () => {
      setUpdateDialog(true)

      const response = await updateMut({
          variables: {
              title: title,
              content: content,
              postId: postId
          },
          update: (cache) => updateAfterPost(postId , title , content , cache)
      })
      setUpdateDialog(false)
      if(!(response.data?.updatePost)){
        setErrorDialog(true)
        return;
      }

      navigation.pop()
  }

  const hideDialog = () => setVisible(false);
  const hideErrorDialog = () => setErrorDialog(false)
  return (
    <View>
      <Appbar.Header style={{ backgroundColor: "white" }}>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title="Edit Post"  />
        <Appbar.Action icon="check" onPress={_updatePost} />
      </Appbar.Header>

      <ScrollView>
        <View style={{ margin: 10 }}>
          <TextInput
            style={styles.inputContainer}
            multiline={true}
            numberOfLines={5}
            placeholder="Set Title"
            maxLength={200}
            onChangeText={(value) => setTitle(value)}
            value={title}
          />
          <Text
            style={{
              alignItems: "flex-end",
              textAlign: "right",
              marginRight: 5,
            }}
          >
            {title.length}/200
          </Text>
        </View>
        <View style={{ margin: 10, padding: 10 }}>
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
            style={{
              alignItems: "flex-end",
              textAlign: "right",
              marginRight: 5,
            }}
          >
            {content.length}/600
          </Text>
        </View>
      </ScrollView>

      <Provider>
        <Portal>
          <Dialog visible={visible} onDismiss={() => {}}>
            <Dialog.Title>Error..!!</Dialog.Title>
            <Dialog.Content>
              <Paragraph>
                Are You Sure You want To Stop Editing Your Post and Go Back To
                Previous Screen?
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={() => {
                  setTitle("");
                  setContent("");
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
          <Dialog visible={updateDialog} onDismiss={() => {}}>
            <Dialog.Content style={{flexDirection: 'row'}}>
                <ActivityIndicator />
                <Text style={{marginLeft:5}}>Updating...</Text>
            </Dialog.Content>
          </Dialog>
        </Portal>
      </Provider>

      <Provider>
        <Portal>
          <Dialog visible={errorDialog} onDismiss={hideErrorDialog}>
            <Dialog.Title>Error..!!</Dialog.Title>
            <Dialog.Content>
              <Paragraph>
               Some Error Occured. Try Again
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideErrorDialog}>Ok</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    margin: 10,
    padding: 15,
    fontSize: 20,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});
