import React, { useState } from "react";
import { View, Text, Alert, SafeAreaView } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { IconButton, Colors } from "react-native-paper";
import { Button, Input } from "react-native-elements";
import {Button as RPButton} from 'react-native-paper'
import { AuthNavProps } from "../../utils/AuthParamList";
import { useLoginMutation } from "../../generated/graphql";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LoginScreen = ({ navigation , route }: AuthNavProps<"Login"> ) => {
  const  {fn}  = route.params ;
  const [userOrEmail, setUserOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const [login] = useLoginMutation();



  const onLoginHandler = async () => {
    
   

  
   
    if (userOrEmail === "" || password === "") {
      setError(true);
      setErrorMessage("All Fields Aree Necessary");
      return;
    }

    const values = {
      usernameOrEmail: userOrEmail,
      password: password,
    };
    const response = await login({
      variables: values,
    });

    if (response.data?.login.errors) {
      if (response.data?.login.errors[0].field === "user") {
        setError(true);
        setErrorMessage(
          "User Does not Exist. Check Your Username or Email Again"
        );
      } else {
        setError(true);
        setErrorMessage("Password Incorrect");
      }
      
      return;
    }


    const user = response.data?.login.user;
    AsyncStorage.setItem(
      "userData",
      JSON.stringify({
        id: user?.id,
        studentId: user?.studentId,
        gender: user?.gender,
        isBanned: user?.isBanned
      })
    );
   fn()
  };

  return (
   <SafeAreaView style={{ flexDirection: 'column',  justifyContent: 'space-around', //Centered vertically
   flex:1}}>
      <View>
      {error ? (
        <View style={{marginBottom: 10 , backgroundColor: '#ff9999'}}>
          <Text style={{color: 'red'}} >{errorMessage}</Text>
        </View>
      ) : null}
      <View  >
        <Input
          placeholder="Username Or Email"
          leftIcon={{ type: "font-awesome", name: "user" }}
          onChangeText={(value) => setUserOrEmail(value)}
          value={userOrEmail}
        />

        <View style={{margin: 5 , flexDirection:'row' ,width:'90%'}}>
          <Input
            placeholder="Password"
            leftIcon={{ type: "font-awesome", name: "comment" }}
            rightIcon={{ type: "font-awesome" }}
            onChangeText={(value) => setPassword(value)}
            value={password}
            secureTextEntry={showPassword}
          />

          {showPassword ? (
            <IconButton
              icon="lock"
              color={Colors.black}
              size={30}
              onPress={() => setShowPassword(false)}
            />
          ) : (
            <IconButton
              icon="lock-open"
              color={Colors.black}
              size={30}
              onPress={() => setShowPassword(true)}
            />
          )}
        </View>
      </View>
      <Button  style={{margin: 10 , width: '50%' ,  alignSelf: 'center'}}title="Sign In" onPress={onLoginHandler} />
    <View style={{marginTop: 5 , flexDirection:'row' , justifyContent: 'center'}}>
      <Text> Don't Have An Account?
      <RPButton mode="text"  onPress={() => navigation.replace("Register")}> 
        Register
      </RPButton>
         </Text>
     
    
       </View>

       <View style={{marginTop: 5 , flexDirection:'row' , justifyContent: 'center'}}> 
        
       <RPButton mode="text"  onPress={() => console.log("Forgot")}> 
        Forgot Password?
      </RPButton>
 
       </View>

      
    </View>
   </SafeAreaView>
  );
};
