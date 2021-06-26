import React , {useState} from 'react'
import { SafeAreaView, View } from 'react-native';
import { Button, Input , Text} from 'react-native-elements';
import { AuthNavProps } from '../../utils/AuthParamList';
import {ActivityIndicator, Button as RPButton, Card, Dialog, Paragraph, Portal, Provider} from 'react-native-paper'
import { useConfirmUserCheckMutation, useGenerateForgotPasswordUrlMutation } from '../../generated/graphql';

interface ForgotPasswordScreenProps {

}

export const ForgotPasswordScreen = ({navigation} : AuthNavProps<"ForgotPassword">) => {

    const [mnitID, setMnitId] = useState("");
    
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mailError, setMailError] = useState(false);
  const [errorMessage , setErrorMessage] = useState("")
  const [removeLogin , setRemoveLogin] = useState(false)
  const [success, setSuccess] = useState(false);
  const [visible, setVisible] = useState(false);
  const [sendForgotPasswordMail] = useGenerateForgotPasswordUrlMutation()
  const [confirm] = useConfirmUserCheckMutation()

 
  const checkUserHandler = async () => {

   
    if(mnitID.length !== 11) {
        setErrorMessage("MNIT ID is always of length 11. Check Your MNIT ID Again.")
        setVisible(true)
        return;
      }

    const response = await confirm({
      variables: {
        studentId: mnitID,
      },
    });


    if (!response.data?.confirmUserCheck.boolResult?.value) {
      if (
        response?.data?.confirmUserCheck.boolResult?.message ==
          "user doesnt exist" ||
        response?.data.confirmUserCheck.boolResult?.message ==
          "user not verified"
      ) {
        setError(true);
        return;
      } else if (
        response?.data?.confirmUserCheck.boolResult?.message ==
        "user already registered"
      ) {
          setError(false)
          setLoading(true)
        const response2 = await sendForgotPasswordMail({
            variables: {
                studentId: mnitID
            }
        })

        if(response2.data?.generateforgotPasswordUrl){
            setSuccess(true)
            setLoading(false)
            setRemoveLogin(true)
            setInterval(() => {
                setSuccess(false)
                navigation.pop()
            } , 4000)
        }
        return;
      }
    }

}

  const sendConfirmationMail = async () => {
    setMailError(false);
    setError(false);
    setLoading(true);
    const response = await sendForgotPasswordMail({
      variables: {
        studentId: mnitID,
      },
    });

    if (!response.data?.generateforgotPasswordUrl) {
      setMailError(true);
    }

    setLoading(false);
    setSuccess(true);
  };

  const hideDialog = () => setVisible(false);

        return (
            <SafeAreaView style={{ flexDirection: 'column',  justifyContent: 'space-around', //Centered vertically
            flex:1}}>
               <View >
              <View>
                <Input
                  placeholder="Mnit Student Id"
                  onChangeText={(value) => setMnitId(value)}
                  value={mnitID}
                />
              </View>
              <Button  style={{margin: 10 , width: '50%' ,  alignSelf: 'center'}} title="Check ID" onPress={checkUserHandler} />
            {
                !removeLogin ?   <RPButton onPress={() => {
                    setMnitId("");
                    navigation.replace("Login");
                 }}> 
                   Go To Login
                 </RPButton> : null
            }
        
              {error ? (
                <View style={{alignContent: 'center' , backgroundColor: '#ff9999'}}>
                  <Card>
                  <Text style={{alignSelf: 'center' , fontSize: 20 , color: 'red'}}>This MNIT ID does not exist. Check Your ID Again</Text>
                 
                  </Card>
                </View>
              ) : null}
        
              {loading ? <ActivityIndicator /> : null}
        
              {mailError ? (
                <View style={{alignContent: 'center'}}>
                  <Text style={{alignSelf: 'center' , fontSize: 20 , color: 'red'}}>Some Error Occurred. Try Again..!!</Text>
                 
                </View>
              ) : null}
              {success ? (
                <View style={{alignContent: 'center'}}>
                  <Card>
                  <Text style={{alignSelf: 'center' , fontSize: 20 , color: 'green'}}>Mail Sent To {mnitID}@mnit.ac.in</Text>
                  <Text style={{alignSelf: 'center' , fontSize: 15 }}>If You Cannot Find Mail in Inbox. Check Your Spam Folder</Text>
                  </Card>
                </View>
              ) : null}
              <Provider>
                <Portal>
                  <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Error</Dialog.Title>
                    <Dialog.Content>
                      <Paragraph>
                        Mnit Id is Always of length 11. Check Your MNIT ID again.
                      </Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                      <RPButton  onPress={hideDialog} >
                            OK
                        </RPButton>
                    </Dialog.Actions>
                  </Dialog>
                </Portal>
              </Provider>
            </View>
            </SafeAreaView>
        );
} 
