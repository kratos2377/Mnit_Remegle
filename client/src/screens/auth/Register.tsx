import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { Input } from "react-native-elements";
import {
  ActivityIndicator,
  Dialog,
  Paragraph,
  Portal,
  Provider,
} from "react-native-paper";
import {
  useConfirmUserCheckMutation,
  useSendConfirmationMailMutation,
} from "../../generated/graphql";
import { AuthNavProps } from "../../utils/AuthParamList";

export const RegisterScreen = ({ navigation }: AuthNavProps<"Register">) => {
  const [mnitID, setMnitId] = useState("");
  const [confirm] = useConfirmUserCheckMutation();
  const [sendMail] = useSendConfirmationMailMutation();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mailError, setMailError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [visible, setVisible] = useState(false);

  const checkUserHandler = async () => {
    const response = await confirm({
      variables: {
        studentId: mnitID,
      },
    });

    if (!response.data?.confirmUserCheck.boolResult?.value) {
      if (
        response?.data?.confirmUserCheck.boolResult?.message ==
          "user doesnt exist" ||
        response.data.confirmUserCheck.boolResult?.message ==
          "user not verified"
      ) {
        setError(true);
        return;
      } else if (
        response?.data?.confirmUserCheck.boolResult?.message ==
        "user already registered"
      ) {
        setVisible(true);
        return;
      }
    }

    navigation.navigate("UserRegister" , {
        mnitId: mnitID.toLowerCase()
    });
  };

  const sendConfirmationMail = async () => {
    setMailError(false);
    setError(false);
    setLoading(true);
    const response = await sendMail({
      variables: {
        studentId: mnitID,
      },
    });

    if (!response.data?.sendConfirmationMail) {
      setMailError(true);
    }

    setLoading(false);
    setSuccess(true);
  };

  const hideDialog = () => setVisible(false);

  return (
    <View style={{ alignItems: "center", flexDirection: "column" }}>
      <View>
        <Input
          placeholder="Mnit Student Id"
          onChangeText={(value) => setMnitId(value)}
          value={mnitID}
        />
      </View>
      <Button title="Check ID" onPress={checkUserHandler} />
      <Button
        title="Go To Login"
        onPress={() => {
          setMnitId("");
          navigation.replace("Login");
        }}
      />

      {error ? (
        <View>
          <Text>Your Mnit Id Is Not Confirmed</Text>
          <Button
            title="Send Confirmation Email"
            onPress={sendConfirmationMail}
          />
        </View>
      ) : null}

      {loading ? <ActivityIndicator /> : null}

      {mailError ? (
        <View>
          <Text>YSome Error Occurred. Try Again..!!</Text>
          <Button
            title="Send Confirmation Email"
            onPress={sendConfirmationMail}
          />
        </View>
      ) : null}
      {success ? (
        <View>
          <Text>Mail Sent To {mnitID}@mnit.ac.in</Text>
          <Text>If You Cannot Find Mail in Inbox. Check Your Spam Folder</Text>
        </View>
      ) : null}
      <Provider>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Error</Dialog.Title>
            <Dialog.Content>
              <Paragraph>
                User Already Registered. Try A Different Mnit Id
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button title="Ok" onPress={hideDialog} />
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </Provider>
    </View>
  );
};
