import React, { useState, useEffect } from 'react';
import { ScrollView, TextInput, View, Text, StyleSheet } from 'react-native';
import {
  ActivityIndicator,
  Appbar,
  Button,
  Dialog,
  Paragraph,
  Portal,
  Provider
} from 'react-native-paper';
import { updateAfterPost } from '../../functions/updateAfterEditPost';
import { updateAfterSpaceDetails } from '../../functions/updateAfterSpaceDetails';
import { useUpdateSpaceDetailsMutation } from '../../generated/graphql';
import { MainNavProps } from '../../utils/MainParamList';

interface EditSpaceScreenProps {}

export const EditSpaceScreen = ({
  navigation,
  route
}: MainNavProps<'EditSpaceScreen'>) => {
  const [visible, setVisible] = useState(false);
  const [spaceName, setSpaceName] = useState('');
  const [spaceDescription, setSpaceDescription] = useState('');
  const [updateDialog, setUpdateDialog] = useState(false);
  const [errorDialog, setErrorDialog] = useState(false);
  const [spaceId, setSpaceId] = useState('');
  const [updateSpace] = useUpdateSpaceDetailsMutation();

  useEffect(() => {
    setSpaceName(route?.params?.spaceName);
    setSpaceDescription(route?.params?.spaceDescription);
    setSpaceId(route?.params?.spaceId);
  }, []);

  const _goBack = () => setVisible(true);

  const _updatePost = async () => {
    setUpdateDialog(true);

    const response = await updateSpace({
      variables: {
        spaceId: spaceId,
        spaceName: spaceName,
        spaceDescription: spaceDescription
      },
      update: (cache) =>
        updateAfterSpaceDetails(spaceId, spaceName, spaceDescription, cache)
    });
    setUpdateDialog(false);
    if (!response.data?.updateSpaceDetails) {
      setErrorDialog(true);
      return;
    }

    navigation.pop();
  };

  const hideDialog = () => setVisible(false);
  const hideErrorDialog = () => setErrorDialog(false);

  return (
    <View>
      <Appbar.Header style={{ backgroundColor: 'white' }}>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title="Update Space Details" />
        <Appbar.Action icon="check" onPress={_updatePost} />
      </Appbar.Header>

      <ScrollView>
        <View style={{ margin: 10 }}>
          <TextInput
            style={styles.inputContainer}
            multiline={true}
            numberOfLines={4}
            placeholder="Set Space Name"
            maxLength={100}
            onChangeText={(value) => setSpaceName(value)}
            value={spaceName}
          />
          <Text
            style={{
              alignItems: 'flex-end',
              textAlign: 'right',
              marginRight: 5
            }}
          >
            {spaceName.length}/100
          </Text>
        </View>
        <View style={{ margin: 10, padding: 10 }}>
          <TextInput
            style={styles.inputContainer}
            multiline={true}
            numberOfLines={8}
            placeholder="Set Space Description"
            maxLength={400}
            onChangeText={(value) => setSpaceDescription(value)}
            value={spaceDescription}
          />
          <Text
            style={{
              alignItems: 'flex-end',
              textAlign: 'right',
              marginRight: 5
            }}
          >
            {spaceDescription.length}/400
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
                  setSpaceName('');
                  setSpaceDescription('');
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
            <Dialog.Content style={{ flexDirection: 'row' }}>
              <ActivityIndicator />
              <Text style={{ marginLeft: 5 }}>Updating...</Text>
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
                Space With this Name Already Exists. Try a different one
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
    padding: 10,
    fontSize: 20,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 10
  },
  container: {
    flex: 1,
    justifyContent: 'space-between'
  }
});
