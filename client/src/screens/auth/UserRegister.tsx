import React ,{useState} from 'react'
import { View , StyleSheet , Text, Button } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Input } from 'react-native-elements/dist/input/Input';
import { Colors, IconButton } from 'react-native-paper';
import { useRegisterMutation } from '../../generated/graphql';
import { AuthNavProps } from '../../utils/AuthParamList';



export const UserRegister = ({navigation , route} : AuthNavProps<'UserRegister'>) => {
   const {fn} = route.params;
   const [name , setName] = useState("")
   const [username , setUserName] = useState("")
   const [password , setPassword] = useState("")
   const [confirmpassword , setConfirmPassword] = useState("")
   const [showPassword , setShowPassword] = useState(true)
   const [showConfirmPassword , setShowConfirmPassword] = useState(true)
   const [items, setItems] = useState([
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'}
  ]);
  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState(null);

  const [register] = useRegisterMutation();

        return (
            <View>
                <View>
                 <Text>Mnit ID:- 2019ucp1403</Text>
                 <Text>Email:- 2019ucp1403@mnit.ac.in</Text>
                </View>
               <View>
               <Input placeholder ="Name" 
               onChangeText={(value) => setName(value)}
               value={name}
               />
                <Input placeholder ="Username" 
               onChangeText={(value) => setUserName(value)}
               value={username}/>

               <View>
               <Input placeholder ="Password" 
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
    
               <View>
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
               <DropDownPicker
      open={open}
      value={gender}
      items={items}
      setOpen={setOpen}
      maxHeight={500}
      placeholder="Choose Gender"
      bottomOffset={100}
      itemSeparator={true}
      categorySelectable={true}
      showTickIcon={false}
      mode="BADGE"
      showBadgeDot={true}
      dropDownDirection="BOTTOM"
      setValue={setGender}
      setItems={setItems}
      dropDownContainerStyle={{
        backgroundColor: "#dfdfdf",
      }}
    />

               </View>

               <Button title="Register" onPress={() => console.log("Register")}/>
            </View>
        );
}

const styles = StyleSheet.create({})