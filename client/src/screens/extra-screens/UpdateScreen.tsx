import React, { useState } from "react";
import { ScrollView, TextInput, View, Text, StyleSheet , Image} from "react-native";
import { Appbar, Button, Card } from "react-native-paper";
import { MainNavProps } from "../../utils/MainParamList";

interface UpdateScreenProps {}

export const UpdateScreen: React.FC<UpdateScreenProps> = ({
  navigation,
}: MainNavProps<"UpdateScreen">) => {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [instaAcc, setInstaAcc] = useState("");
  const [twitterAcc, setTwitterAcc] = useState("");

  const _goBack = () => navigation.pop();

  const _handleMore = () => console.log("Shown more");

  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title="Title" subtitle="Subtitle" />
        <Appbar.Action icon="check" onPress={_handleMore} />
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
              style={{ width: 200, height: 200, borderRadius: 100 , margin:20 }}
              source={require('../../../assets/doomSlayer.png')}
            />
          
          <Button onPress={() => console.log("Changing Picture") }>Change DP </Button>
       
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
