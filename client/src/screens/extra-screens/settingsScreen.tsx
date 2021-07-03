import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import {
  Button,
  Card,
  Dialog,
  List,
  Paragraph,
  Portal,
  Provider
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLogoutMutation } from '../../generated/graphql';
import { MainNavProps } from '../../utils/MainParamList';

interface settingsScreenProps {}

export const SettingsScreen = ({
  navigation,
  route
}: MainNavProps<'Settings'>) => {
  const [logout] = useLogoutMutation();
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);
  const [logoutVisible, setLogoutVisible] = useState(false);

  const handleOpen = () => setVisible(true);
  const handleClose = () => setVisible(false);

  const handleLogoutOpen = () => setLogoutVisible(true);
  const handleLogoutClose = () => setLogoutVisible(false);

  const { fn } = route.params;
  const logoutHandler = async () => {
    setLogoutVisible(false);
    const response = await logout();

    if (!response.data) {
      setError('Could Not Logout');
      setVisible(true);
      return;
    }

    AsyncStorage.removeItem('userData');

    fn();
    // navigation.popToTop()
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, width: '100%' }}>
        <ScrollView>
          <Card style={{ marginVertical: 10, padding: 10 }}>
            <List.Item
              title="Logout"
              description="Logout From App"
              left={(props) => <List.Icon {...props} icon="logout" />}
              onPress={handleLogoutOpen}
            />
          </Card>
          <Card style={{ marginVertical: 10, padding: 10 }}>
            <List.Item
              title="Your Spaces"
              description="Check All Of The Spaces You Have Created"
              left={(props) => <List.Icon {...props} icon="postage-stamp" />}
              onPress={() => navigation.navigate('YourSpaces')}
            />
          </Card>
          <Card style={{ marginVertical: 10, padding: 10 }}>
            <List.Item
              title="Edit Profile"
              description="Update Your Details"
              left={(props) => <List.Icon {...props} icon="account-edit" />}
              onPress={() => navigation.navigate('UpdateScreen')}
            />
          </Card>
        </ScrollView>

        <Provider>
          <Portal>
            <Dialog visible={visible} onDismiss={handleClose}>
              <Dialog.Title>Error</Dialog.Title>
              <Dialog.Content>
                <Paragraph>{error}</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={handleClose}>OK</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </Provider>

        <Provider>
          <Portal>
            <Dialog visible={logoutVisible} onDismiss={handleLogoutClose}>
              <Dialog.Title>Logout</Dialog.Title>
              <Dialog.Content>
                <Paragraph>Are You Sure You Want To Logout?</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={logoutHandler}>Yes</Button>
                <Button onPress={handleLogoutClose}>No</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </Provider>
      </View>
    </SafeAreaView>
  );
};
