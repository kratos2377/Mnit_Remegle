import React ,{useState} from 'react'
import { View , StyleSheet , Text, Button, Picker } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Input } from 'react-native-elements/dist/input/Input';
import { Colors, Dialog, IconButton, Paragraph, Portal, Provider } from 'react-native-paper';
import MenuItem from 'react-native-paper/lib/typescript/components/Menu/MenuItem';
import { useRegisterMutation } from '../../generated/graphql';
import { AuthNavProps } from '../../utils/AuthParamList';
import AsyncStorage from '@react-native-async-storage/async-storage';



export const UserRegister = ({navigation , route} : AuthNavProps<'UserRegister'>) => {
   const {fn} = route.params;
   const [firstName , setFirstName] = useState("")
   const [lastName , setLastName] = useState("")
   const [username , setUserName] = useState("")
   const [password , setPassword] = useState("")
   const [confirmpassword , setConfirmPassword] = useState("")
   const [showPassword , setShowPassword] = useState(true)
   const [showConfirmPassword , setShowConfirmPassword] = useState(true)
  const [visible , setVisible] = useState(false)
  const [error ,setError] = useState("")
  const [selectedValue, setSelectedValue] = useState<"Male" | "Female">("Male");

  const [register] = useRegisterMutation();
  const hideDialog = () => setVisible(false)

  const handleRegister = async () => {
     if(lastName == "" || firstName == "" || password == "" || username == "" || confirmpassword=="" || selectedValue == "Choose Gender"){
       setVisible(true)
       setError("All Fields Are Necesarry")
       return;
     }

     if(password.length < 8){
       setVisible(true)
       setError("Password's Length Must Be Greater Than 8")
       return;
     }


     if(password != confirmpassword){
       setVisible(true)
       setError("Passwords Don't Match")
       return;
     }
     var email: string = `${route?.params?.mnitId.toLowerCase()}`+ "@mnit.ac.in"
     const values = {
      studentId:  `${route?.params?.mnitId.toLowerCase()}`,
      firstName: firstName,
      lastName: lastName,
      email : email,
      password : password,
      gender: selectedValue,
      username: username,
     }

     const response = await register({
       variables: { data: values}
     })
     
     if(response.data?.registerUser.boolResult){
      if(!(response.data?.registerUser.boolResult?.value)){
        console.log(response)
        return;
      }
     }

    

     const user = response?.data?.registerUser.user;

     AsyncStorage.setItem(
      "userData",
      JSON.stringify({
        id: user?.id,
        studentId: user?.studentId,
        gender: user?.gender,
        isBanned: user?.isBanned,
        godAdmin: user?.godAdmin
      })
    );

   fn()

     
  }

        return (
            <View>
                <View>
                 <Text>Mnit ID:- {route.params.mnitId}</Text>
                 <Text>Email:-  {route.params.mnitId}@mnit.ac.in</Text>
                </View>
               <View>
               <Input placeholder ="First Name" 
               onChangeText={(value) => setFirstName(value)}
               value={firstName}
               />
               <Input placeholder ="Last Name" 
               onChangeText={(value) => setLastName(value)}
               value={lastName}
               />
                <Input placeholder ="Username" 
               onChangeText={(value) => setUserName(value)}
               value={username}/>

               <View style={{margin: 5 , flexDirection:'row' ,width:'90%'}}>
               <Input 
               placeholder ="Password" 
               onChangeText={(value) => setPassword(value)}
               value={password}
               secureTextEntry={showPassword}
               />

{ showPassword ? <IconButton  icon="lock"
       color={Colors.black}
         size={20}
         onPress={() => setShowPassword(false)} />
            : <IconButton icon="lock-open"
       color={Colors.black}
         size={20}
         onPress={() => setShowPassword(true)} /> }
               </View>
    
               <View style={{margin: 5 , flexDirection:'row' ,width:'90%'}}>
               <Input placeholder ="Confirm Password" 
               onChangeText={(value) => setConfirmPassword(value)}
               value={confirmpassword}
               secureTextEntry={showConfirmPassword}
               />

{ showConfirmPassword ? <IconButton  icon="lock"
       color={Colors.black}
         size={20}
         onPress={() => setShowConfirmPassword(false)} />
            : <IconButton icon="lock-open"
       color={Colors.black}
         size={20}
         onPress={() => setShowConfirmPassword(true)} /> }
               </View>
              
               <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />
      </Picker>
    </View>

               </View>

               <View style={{margin: 20}}>
               <Button  title="Register" onPress={handleRegister}/>
               </View>
               <Provider>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Error</Dialog.Title>
            <Dialog.Content>
              <Paragraph>
                {error}
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    marginLeft: 20,
    alignItems: 'flex-start'
  }
})