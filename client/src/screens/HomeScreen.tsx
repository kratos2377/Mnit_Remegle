import React , {useState , useEffect} from 'react'
import {View , Text} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from './auth/Login';
import { RegisterScreen } from './auth/Register';
import { AuthParamList } from '../utils/AuthParamList';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FeedScreen } from './main/FeedScreen';
import { SearchScreen } from './main/SearchScreen';
import { VideoChatScreen } from './main/VideoChatScreen';
import { ProfileScreen } from './main/ProfileScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { UserRegister } from './auth/UserRegister';



export default function HomeScreen() {
  
  const [loggedIn , setLoggedIn] = useState(false);
  const Stack  = createStackNavigator<AuthParamList>(); 
  const Tab = createBottomTabNavigator();
   const itemId = 42 as number
  const tryLogin = async () => {
    const userData = await AsyncStorage.getItem('userData') 
    console.log(userData)

   if(userData){
     console.log(userData)
     setLoggedIn(true);
   } 
  }
  
  const test = () => {
    console.log("WORKING")
  }
  

  useEffect( () => {
     tryLogin()
   //AsyncStorage.removeItem('userData')
         
  } , [])


  if(!loggedIn){
    return(
      <NavigationContainer >
        <Stack.Navigator initialRouteName="Login"  screenOptions={{
        header: () => null
      }}
      >
          <Stack.Screen name="Login" component={LoginScreen} initialParams={{ fn: tryLogin }}  />
          <Stack.Screen name="Register" component={RegisterScreen}/>
          <Stack.Screen name="UserRegister" component={UserRegister} initialParams={{fn: tryLogin}}/>

        </Stack.Navigator>
      </NavigationContainer>
    );
  }

    return (
     <NavigationContainer>
      <Tab.Navigator initialRouteName="Feed" tabBarOptions={{ showLabel: false }}>
      <Tab.Screen name="Feed" component={FeedScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
           
        }}
      />
      <Tab.Screen name="Search" component={SearchScreen}
           options={{
            tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="magnify" color={color} size={26} />
            ),
        }}
      />
      <Tab.Screen name="Video" component={VideoChatScreen}
         options={{
          tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="message-video" color={color} size={26} />
          ),
      }}
      
      />
      <Tab.Screen name="Profile" component={ProfileScreen}
         options={{
          tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account-circle" color={color} size={26} />
          ),
      }}
      
      />
      </Tab.Navigator>
     </NavigationContainer>
    )
}
