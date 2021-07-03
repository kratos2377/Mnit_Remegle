import React, { useEffect, useState } from 'react';
import { Dimensions, Keyboard, View } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import {
  ActivityIndicator,
  Card,
  Dialog,
  Paragraph,
  Portal,
  Provider
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  useConfirmUserCheckMutation,
  useSendConfirmationMailMutation
} from '../../generated/graphql';
import { Button as RPButton } from 'react-native-paper';
import { AuthNavProps } from '../../utils/AuthParamList';

export const RegisterScreen = ({ navigation }: AuthNavProps<'Register'>) => {
  const [mnitID, setMnitId] = useState('');
  const [confirm] = useConfirmUserCheckMutation();
  const [sendMail] = useSendConfirmationMailMutation();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [mailError, setMailError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mobileWidth, setMobileWidth] = useState(0);

  const checkUserHandler = async () => {
    Keyboard.dismiss();
    if (mnitID.length !== 11) {
      setErrorMessage(
        'MNIT ID is always of length 11. Check Your MNIT ID Again.'
      );
      setVisible(true);
      return;
    }

    setLoading(true);
    const response = await confirm({
      variables: {
        studentId: mnitID.toLowerCase()
      }
    });
    setLoading(false);

    if (!response.data?.confirmUserCheck.boolResult?.value) {
      if (
        response?.data?.confirmUserCheck.boolResult?.message ==
          'user doesnt exist' ||
        response.data.confirmUserCheck.boolResult?.message ==
          'user not verified'
      ) {
        setError(true);
        return;
      } else if (
        response?.data?.confirmUserCheck.boolResult?.message ==
        'user already registered'
      ) {
        setErrorMessage(
          'User Already Registered With this ID. Try a different MNIT ID.'
        );
        setVisible(true);
        return;
      }
    }

    navigation.navigate('UserRegister', {
      mnitId: mnitID.toLowerCase()
    });
  };

  const sendConfirmationMail = async () => {
    setMailError(false);
    setError(false);
    setLoading(true);
    const response = await sendMail({
      variables: {
        studentId: mnitID.toLowerCase()
      }
    });

    if (!response.data?.sendConfirmationMail) {
      setMailError(true);
    }

    setLoading(false);
    setSuccess(true);
  };

  const hideDialog = () => setVisible(false);

  useEffect(() => {
    const width1 = Dimensions.get('window').width;
    setMobileWidth(width1);
  }, []);

  return (
    <SafeAreaView
      style={{
        flexDirection: 'column',
        justifyContent: 'space-around', //Centered vertically
        flex: 1
      }}
    >
      <View>
        <View>
          <Input
            placeholder="Mnit Student Id"
            onChangeText={(value) => setMnitId(value)}
            value={mnitID}
          />
        </View>
        <Button
          buttonStyle={{
            width: mobileWidth * 0.5,
            margin: 10,
            alignSelf: 'center'
          }}
          style={{ margin: 10, width: '50%', alignSelf: 'center' }}
          title="Check ID"
          onPress={checkUserHandler}
        />
        <RPButton
          onPress={() => {
            setMnitId('');
            navigation.replace('Login');
          }}
        >
          Go To Login
        </RPButton>

        {error ? (
          <View style={{ alignContent: 'center' }}>
            <Card>
              <Text style={{ alignSelf: 'center', fontSize: 20 }}>
                Your Mnit Id Is Not Confirmed
              </Text>
              <RPButton
                style={{ margin: 10, width: '50%', alignSelf: 'center' }}
                onPress={sendConfirmationMail}
              >
                Send Confirmation Email
              </RPButton>
            </Card>
          </View>
        ) : null}

        {loading ? <ActivityIndicator /> : null}

        {mailError ? (
          <View style={{ alignContent: 'center' }}>
            <Text style={{ alignSelf: 'center', fontSize: 20, color: 'red' }}>
              Some Error Occurred. Try Again..!!
            </Text>
          </View>
        ) : null}
        {success ? (
          <View style={{ alignContent: 'center' }}>
            <Card>
              <Text
                style={{ alignSelf: 'center', fontSize: 20, color: 'green' }}
              >
                Mail Sent To {mnitID}@mnit.ac.in
              </Text>
              <Text style={{ alignSelf: 'center', fontSize: 15 }}>
                If You Cannot Find Mail in Inbox. Check Your Spam Folder
              </Text>
            </Card>
          </View>
        ) : null}
        <Provider>
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>Error</Dialog.Title>
              <Dialog.Content>
                <Paragraph>{errorMessage}</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <RPButton onPress={hideDialog}>OK</RPButton>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </Provider>
      </View>
    </SafeAreaView>
  );
};
