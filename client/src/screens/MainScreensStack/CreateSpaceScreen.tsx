import LottieView from 'lottie-react-native';
import React, { useState } from "react";
import { View, Text, TextInput , StyleSheet } from "react-native";
import { Appbar, Button, Dialog, Paragraph, Portal, Provider } from "react-native-paper";
import { useCreateSpaceMutation } from "../../generated/graphql";
import { MainNavProps } from "../../utils/MainParamList";

interface CreateSpaceScreenProps {}

export const CreateSpaceScreen = ({
  navigation,
}: MainNavProps<"CreateSpace">) => {
  const [spaceName, setSpaceName] = useState("");
  const [spaceDescription, setSpaceDescription] = useState("");
  const [visible, setVisible] = useState(false);
  const [postVisible, setPostVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [postError , setPostError] = useState("")

  const [createSpace] = useCreateSpaceMutation()

  const showDialog = () => setVisible(true);

  const handleYes = () => {
      setSpaceName("")
      setSpaceDescription("")
      setVisible(false);
      navigation.pop()
  };
  const handleNo = () => setVisible(false);
  const handlePostNo = () => setPostVisible(false);
  const handleSuccessNo = () => setSuccessVisible(false);

  const _goBack = () => {
      if(spaceName.trim().length === 0 && spaceDescription.trim().length === 0 ){
          navigation.pop();
          return;
      }

      showDialog();
  }

  const _createSpace = async () => {
      if(spaceName.trim().length === 0 || spaceDescription.trim().length === 0){
          setPostError("All Fields Are Necesarry")
          setPostVisible(true)
          return ;
      }

      if(spaceName.trim().length <= 5)
      {
        setPostError("Space Name Length Must Be Grater 5")
        setPostVisible(true)
        return ;
      }

      if(spaceDescription.trim().length <= 10){
        setPostError("Space Description Must Be Greater Than 10")
        setPostVisible(true)
        return ;
      }
const response = await createSpace({
  variables: {
    spaceName: spaceName,
    spaceDescription: spaceDescription
  }
})
  

if(!(response.data?.createSpace)){
  setPostError("Space With This Name Exists. Try A Different Name")
  setPostVisible(true)
 return;
}

setSuccessVisible(true)


  }; 


  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title="Create Space"  />
        <Appbar.Action icon="check" onPress={_createSpace} />
      </Appbar.Header>
      <View style={{margin: 10}}>
      <TextInput style={styles.inputContainer} placeholder="Space Name" maxLength={40} onChangeText={(value) => setSpaceName(value)} value={spaceName}/>
      <Text style={{alignItems: 'flex-end' , textAlign: 'right' , marginRight: 5}}>{spaceName.length}/40</Text>
      </View>
      <View style={{margin: 10}}>
      <TextInput style={styles.inputContainer} multiline={true} numberOfLines={4} placeholder="Space Description" maxLength={200} onChangeText={(value) => setSpaceDescription(value)} value={spaceDescription} />
      <Text style={{alignItems: 'flex-end' , textAlign: 'right' , marginRight: 5}}>{spaceDescription.length}/200</Text>
      </View>
      
   <Provider>
   <Portal>
        <Dialog visible={visible} onDismiss={handleNo}>
          <Dialog.Title>Wait</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Are You Sure You Want to Cancel This Process And Go Back</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleYes}>Yes</Button>
            <Button onPress={handleNo}>No</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
   </Provider>

   <Provider>
   <Portal>
        <Dialog visible={postVisible} onDismiss={handlePostNo}>
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{postError}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handlePostNo}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
   </Provider>

   <Provider>
   <Portal>
        <Dialog visible={successVisible} onDismiss={handleSuccessNo}>
          <Dialog.Title>Success</Dialog.Title>
          <Dialog.Content>
          <LottieView
         
        source={require('../../../assets/success.json')}
      />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleSuccessNo}>Ok</Button>
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
       fontSize: 20 
   }
})
