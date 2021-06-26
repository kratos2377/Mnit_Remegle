import React, { useState , useEffect } from "react";
import {
  ScrollView,
  TextInput,
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
} from "react-native";
import {
  ActivityIndicator,
  Appbar,
  Button,
  Card,
  Dialog,
  Paragraph,
  Portal,
  Provider,
} from "react-native-paper";
import { updateUserDetails } from "../../functions/updateUserDetails";
import {
  useDoesUsernameExistMutation,
  useMeLazyQuery,
  useMeQuery,
  useUpdateUserMutation,
} from "../../generated/graphql";
import { MainNavProps } from "../../utils/MainParamList";

interface UpdateScreenProps {}

export const UpdateScreen = ({ navigation }: MainNavProps<"UpdateScreen">) => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [instaAcc, setInstaAcc] = useState("");
  const [twitterAcc, setTwitterAcc] = useState("");
  const [updateUser] = useUpdateUserMutation();
  const [usernameExist] = useDoesUsernameExistMutation()
  const [visible, setVisible] = useState(false);
  const { data, loading } = useMeQuery();

  // setUsername(data?.me?.username);
  // setBio(data?.me?.bio);
  // setInstaAcc(data?.me?.instagramAcc);
  // setTwitterAcc(data?.me?.twitterAcc);

  const _goBack = () => {
    setDialogVisible(true);
  };

  useEffect(() => {
   setUsername(data?.me?.username);
  setBio(data?.me?.bio);
  setInstaAcc(data?.me?.instagramAcc);
  setTwitterAcc(data?.me?.twitterAcc);
  } , [])

  const _updateProfile = async () => {
    setVisible(true);

    const userName = username === "" ? data.me.username : username;
    const Bio = bio === "" ? data.me.bio : bio;
    const Twitter = twitterAcc === "" ? data.me.twitterAcc : twitterAcc;
    const Insta = instaAcc === "" ? data.me.instagramAcc : instaAcc;

    const response = await usernameExist({
      variables: {
        username : userName
      }
    })

    setVisible(false);

    if (!response.data) {
      setError("Username Already In Use. Try A Different One");
      setErrorVisible(true);    
      return;
    }
    
    await updateUser({

      variables: {
        username: userName,
        bio: Bio,
        twitterAcc: Twitter,
        instagramAcc: Insta,
      },

      update: (cache) => updateUserDetails( data?.me?.id , userName , bio , twitterAcc , instaAcc , cache)
    });

    navigation.pop();
  };

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          <Appbar.Header>
            <Appbar.BackAction onPress={_goBack} />
            <Appbar.Content title="Edit Profile" />
            <Appbar.Action icon="check" onPress={_updateProfile} />
          </Appbar.Header>
          <ScrollView>
            <Card
              style={{
                width: "100%",
                padding: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 100,
                  margin: 20,
                }}
                source={require("../../../assets/doomSlayer.png")}
              />

              <Button onPress={() => console.log("Changing Picture")}>
                Change DP{" "}
              </Button>
            </Card>
            <View style={{ margin: 10 }}>
              <TextInput
                style={styles.inputContainer}
                placeholder="Username"
                maxLength={40}
                onChangeText={(value) => setUsername(value)}
                value={username}
              />
              <Text
                style={{
                  alignItems: "flex-end",
                  textAlign: "right",
                  marginRight: 5,
                }}
              >
                {username.length}/40
              </Text>
            </View>
            <View style={{ margin: 10 }}>
              <TextInput
                style={styles.inputContainer}
                multiline={true}
                numberOfLines={5}
                placeholder="Your Bio..."
                maxLength={100}
                onChangeText={(value) => setBio(value)}
                value={bio}
              />
              <Text
                style={{
                  alignItems: "flex-end",
                  textAlign: "right",
                  marginRight: 5,
                }}
              >
                {bio.length}/100
              </Text>
            </View>
            <View style={{ margin: 10 }}>
              <TextInput
                style={styles.inputContainer}
                multiline={true}
                numberOfLines={2}
                placeholder="Instagram Acc. For Eg:- https://www.instagram.com/selenagomez"
                onChangeText={(value) => setInstaAcc(value)}
                value={instaAcc}
              />
            </View>
            <View style={{ margin: 10 }}>
              <TextInput
                style={styles.inputContainer}
                multiline={true}
                numberOfLines={2}
                placeholder="Twitter Acc. For Eg:- https://twitter.com/TheRock"
                maxLength={100}
                onChangeText={(value) => setTwitterAcc(value)}
                value={twitterAcc}
              />
            </View>
          </ScrollView>
          <Provider>
            <Portal>
            <Dialog visible={visible} onDismiss={() => {}}>
                <Dialog.Content>
                <View style={{flexDirection: 'row' , padding: 10 , alignSelf:'center' , alignItems:'center'}}>
                <ActivityIndicator size="small" color="#7d827f" />
                <Text style={{ marginLeft: 10 , fontSize:30  }}>Updating...</Text>
                </View>
                </Dialog.Content>
              </Dialog>
            </Portal>
          </Provider>

          <Provider>
            <Portal>
              <Dialog visible={errorVisible} onDismiss={() => {}}>
                <Dialog.Title>Error!</Dialog.Title>
                <Dialog.Content>
                  <Paragraph>{error}</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={() => setErrorVisible(false)}>OK</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </Provider>
          <Provider>
            <Portal>
              <Dialog visible={dialogVisible} onDismiss={() => {}}>
                <Dialog.Title>Cancel Edit!</Dialog.Title>
                <Dialog.Content>
                  <Paragraph>
                    Do You want to Cancel the Changes and Go back to previous
                    Screen?
                  </Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button
                    onPress={() => {
                      setDialogVisible(false);
                      navigation.pop();
                    }}
                  >
                    Yes
                  </Button>
                  <Button onPress={() => setDialogVisible(false)}>No</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </Provider>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    margin: 10,
    padding: 15,
    fontSize: 20,
  },
});
