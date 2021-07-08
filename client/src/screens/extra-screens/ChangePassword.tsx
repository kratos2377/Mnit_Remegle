import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  Keyboard,
  Modal
} from 'react-native';
import { Input } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import {
  ActivityIndicator,
  Appbar,
  Button,
  Colors,
  Dialog,
  IconButton,
  Paragraph,
  Portal,
  Provider
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useChangePasswordMutation } from '../../generated/graphql';
import { MainNavProps } from '../../utils/MainParamList';

interface ChangePasswordProps {}

export const ChangePassword = ({
  navigation
}: MainNavProps<'ChangePassword'>) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(true);
  const [showNewPassword, setShowNewPassword] = useState(true);
  const [showNewConfirmPassword, setShowNewConfirmPassword] = useState(true);
  const [mobileWidth, setMobileWidth] = useState(0);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [GoBackModal, setGoBackModal] = useState(false);
  const [changePassword] = useChangePasswordMutation();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [changing, setChanging] = useState(false);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    const width1 = Dimensions.get('window').width;
    setMobileWidth(width1);
  }, []);

  const _goBack = () => setGoBackModal(true);

  const hideModal = () => setGoBackModal(false);
  const hideErrorModal = () => setError(false);

  const hideChangingModal = () => setChanging(false);
  const hideChangedModal = () => setChanged(false);

  const changePasswordHandle = async () => {
    Keyboard.dismiss();

    if (
      currentPassword.trim().length === 0 ||
      newPassword.trim().length === 0 ||
      confirmNewPassword.trim().length === 0
    ) {
      setErrorMessage('All Fields Are Necessary');
      setError(true);
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setErrorMessage("Password's Don't Match. Check Again");
      setError(true);
      return;
    }

    if (newPassword.trim().length < 8) {
      setErrorMessage('Password Must be greater than or equal to 8');
      setError(true);
      return;
    }
    setChanging(true);
    const response = await changePassword({
      variables: {
        currentPassword: currentPassword,
        newPassword: newPassword
      }
    });

    setChanging(false);

    if (!response.data?.changePassword) {
      setErrorMessage('Current Password Incorrect. Try Again');
      setError(true);
      return;
    }

    setChanged(true);
  };
  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    margin: 10
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, width: '100%' }}>
        <Appbar.Header>
          <Appbar.BackAction onPress={_goBack} />
          <Appbar.Content title="Change Password" subtitle={''} />
          <Appbar.Action icon="check" onPress={changePasswordHandle} />
        </Appbar.Header>

        <View style={{ flex: 1 }}>
          <View
            style={{
              margin: 5,
              flexDirection: 'row',
              width: mobileWidth * 0.85
            }}
          >
            <Input
              placeholder="Current Password"
              leftIcon={{ type: 'font-awesome', name: 'comment' }}
              rightIcon={{ type: 'font-awesome' }}
              onChangeText={(value) => setCurrentPassword(value)}
              value={currentPassword}
              secureTextEntry={showCurrentPassword}
            />

            {showCurrentPassword ? (
              <IconButton
                icon="lock"
                color={Colors.black}
                size={30}
                onPress={() => setShowCurrentPassword(false)}
              />
            ) : (
              <IconButton
                icon="lock-open"
                color={Colors.black}
                size={30}
                onPress={() => setShowCurrentPassword(true)}
              />
            )}
          </View>

          <View
            style={{
              margin: 5,
              flexDirection: 'row',
              width: mobileWidth * 0.85
            }}
          >
            <Input
              placeholder="New Password"
              leftIcon={{ type: 'font-awesome', name: 'comment' }}
              rightIcon={{ type: 'font-awesome' }}
              onChangeText={(value) => setNewPassword(value)}
              value={newPassword}
              secureTextEntry={showNewPassword}
            />

            {showNewPassword ? (
              <IconButton
                icon="lock"
                color={Colors.black}
                size={30}
                onPress={() => setShowNewPassword(false)}
              />
            ) : (
              <IconButton
                icon="lock-open"
                color={Colors.black}
                size={30}
                onPress={() => setShowNewPassword(true)}
              />
            )}
          </View>

          <View
            style={{
              margin: 5,
              flexDirection: 'row',
              width: mobileWidth * 0.85
            }}
          >
            <Input
              placeholder="Confirm New Password"
              leftIcon={{ type: 'font-awesome', name: 'comment' }}
              rightIcon={{ type: 'font-awesome' }}
              onChangeText={(value) => setConfirmNewPassword(value)}
              value={confirmNewPassword}
              secureTextEntry={showNewConfirmPassword}
            />

            {showCurrentPassword ? (
              <IconButton
                icon="lock"
                color={Colors.black}
                size={30}
                onPress={() => setShowNewConfirmPassword(false)}
              />
            ) : (
              <IconButton
                icon="lock-open"
                color={Colors.black}
                size={30}
                onPress={() => setShowNewConfirmPassword(true)}
              />
            )}
          </View>
        </View>

        <Provider>
          <Portal>
            <Dialog visible={GoBackModal} onDismiss={hideModal}>
              <Dialog.Title>Wait..!!</Dialog.Title>
              <Dialog.Content>
                <Paragraph>Are You sure you wanna Go Back?</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button
                  onPress={() => {
                    setNewPassword('');
                    setCurrentPassword('');
                    setConfirmNewPassword('');
                    navigation.pop();
                  }}
                >
                  Yes
                </Button>
                <Button onPress={hideModal}>No</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </Provider>
        <Provider>
          <Portal>
            <Dialog visible={error} onDismiss={() => {}}>
              <Dialog.Title>Error</Dialog.Title>
              <Dialog.Content>
                <Paragraph>{errorMessage}</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideErrorModal}>Done</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </Provider>

        <Provider>
          <Portal>
            <Dialog visible={changing} onDismiss={() => {}}>
              <Dialog.Title>Updating...</Dialog.Title>
              <Dialog.Content>
                <View style={{ flexDirection: 'row' }}>
                  <ActivityIndicator />
                  <Text style={{ fontSize: 15, marginLeft: 10 }}>
                    Changing Password....
                  </Text>
                </View>
              </Dialog.Content>
            </Dialog>
          </Portal>
        </Provider>
        <Provider>
          <Portal>
            <Dialog visible={changed} onDismiss={() => {}}>
              <Dialog.Title>Success</Dialog.Title>
              <Dialog.Content>
                <Paragraph>Password Changed</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => navigation.pop()}>OK</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </Provider>
      </View>
    </SafeAreaView>
  );
};
