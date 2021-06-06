import React , {useState} from 'react'
import { View , Text, Button } from 'react-native';
import { Input } from 'react-native-elements';
import { AuthNavProps } from '../../utils/AuthParamList';


export const RegisterScreen = ({navigation} : AuthNavProps<'Register'>) => {

    const [mnitID , setMnitId] = useState("")

        return (
            <View>
               <View>
                   <Input
                   placeholder="Mnit Student Id"
                   onChangeText={(value) => setMnitId(value)}
                   value={mnitID}
                   />
               </View>
                <Button title="Check ID" onPress={() => navigation.navigate('UserRegister')}/>
                <Button title="Go To Login" onPress={() => navigation.replace('Login') }/>
            </View>
        );
}