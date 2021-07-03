import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  Picker,
  ScrollView,
  Dimensions,
  Keyboard
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Input } from 'react-native-elements/dist/input/Input';
import {
  ActivityIndicator,
  Colors,
  Dialog,
  IconButton,
  Paragraph,
  Portal,
  Provider
} from 'react-native-paper';
import MenuItem from 'react-native-paper/lib/typescript/components/Menu/MenuItem';
import {
  MeDocument,
  MeQuery,
  useRegisterMutation
} from '../../generated/graphql';
import { AuthNavProps } from '../../utils/AuthParamList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

export const UserRegister = ({
  navigation,
  route
}: AuthNavProps<'UserRegister'>) => {
  const { fn } = route.params;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');
  const [selectedValue, setSelectedValue] = useState<'Male' | 'Female'>('Male');
  const [loading, setLoading] = useState(false);

  const [register] = useRegisterMutation();
  const hideDialog = () => setVisible(false);

  const handleRegister = async () => {
    Keyboard.dismiss();

    if (
      lastName == '' ||
      firstName == '' ||
      password == '' ||
      username == '' ||
      confirmpassword == ''
    ) {
      setVisible(true);
      setError('All Fields Are Necesarry');
      return;
    }

    if (password.length < 8) {
      setVisible(true);
      setError("Password's Length Must Be Greater Than 8");
      return;
    }

    if (password != confirmpassword) {
      setVisible(true);
      setError("Passwords Don't Match");
      return;
    }

    if (username.includes('@')) {
      setVisible(true);
      setError('Username Cannot Contain @. Try a Different Username');
      return;
    }

    var email: string =
      `${route?.params?.mnitId.toLowerCase()}` + '@mnit.ac.in';
    const values = {
      studentId: `${route?.params?.mnitId.toLowerCase()}`,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      gender: selectedValue,
      username: username
    };

    setLoading(true);

    const response = await register({
      variables: { data: values },
      update: (cache, { data }) => {
        cache.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            __typename: 'Query',
            me: data?.registerUser.user
          }
        });
        cache.evict({ fieldName: 'posts:{}' });
      }
    });

    setLoading(false);

    if (response.data?.registerUser.boolResult) {
      if (!response.data?.registerUser.boolResult?.value) {
        return;
      }
    }

    const user = response?.data?.registerUser.user;

    AsyncStorage.setItem(
      'userData',
      JSON.stringify({
        id: user?.id,
        studentId: user?.studentId,
        gender: user?.gender,
        isBanned: user?.isBanned,
        godAdmin: user?.godAdmin
      })
    );

    fn();
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            marginTop: Dimensions.get('window').height * 0.125,
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'center'
          }}
        >
          <View>
            <Text style={{ margin: 5, fontSize: 15 }}>
              Mnit ID:- {route.params.mnitId}
            </Text>
            <Text style={{ margin: 5, fontSize: 15 }}>
              Email:- {route.params.mnitId}@mnit.ac.in
            </Text>
          </View>
          <View>
            <Input
              placeholder="First Name"
              onChangeText={(value) => setFirstName(value)}
              value={firstName}
            />
            <Input
              placeholder="Last Name"
              onChangeText={(value) => setLastName(value)}
              value={lastName}
            />
            <Input
              placeholder="Username"
              onChangeText={(value) => setUserName(value)}
              value={username}
            />

            <View style={{ margin: 5, flexDirection: 'row', width: '90%' }}>
              <Input
                placeholder="Password"
                onChangeText={(value) => setPassword(value)}
                value={password}
                secureTextEntry={showPassword}
              />

              {showPassword ? (
                <IconButton
                  icon="lock"
                  color={Colors.black}
                  size={20}
                  onPress={() => setShowPassword(false)}
                />
              ) : (
                <IconButton
                  icon="lock-open"
                  color={Colors.black}
                  size={20}
                  onPress={() => setShowPassword(true)}
                />
              )}
            </View>

            <View style={{ margin: 5, flexDirection: 'row', width: '90%' }}>
              <Input
                placeholder="Confirm Password"
                onChangeText={(value) => setConfirmPassword(value)}
                value={confirmpassword}
                secureTextEntry={showConfirmPassword}
              />

              {showConfirmPassword ? (
                <IconButton
                  icon="lock"
                  color={Colors.black}
                  size={20}
                  onPress={() => setShowConfirmPassword(false)}
                />
              ) : (
                <IconButton
                  icon="lock-open"
                  color={Colors.black}
                  size={20}
                  onPress={() => setShowConfirmPassword(true)}
                />
              )}
            </View>

            <View style={styles.container}>
              <Text style={{ marginBottom: 5, fontSize: 15 }}>
                Choose Gender:-{' '}
              </Text>
              <Picker
                selectedValue={selectedValue}
                style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedValue(itemValue)
                }
              >
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
              </Picker>
            </View>
          </View>

          {loading ? (
            <ActivityIndicator />
          ) : (
            <View style={{ margin: 20 }}>
              <Button title="Register" onPress={handleRegister} />
            </View>
          )}
          <Provider>
            <Portal>
              <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>Error</Dialog.Title>
                <Dialog.Content>
                  <Paragraph>{error}</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button title="Ok" onPress={hideDialog} />
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </Provider>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    marginLeft: 20,
    alignItems: 'flex-start'
  }
});
