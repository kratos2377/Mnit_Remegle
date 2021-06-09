import React , {useState , useEffect} from 'react'
import {View , Text} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import {  MainScreen } from './MainScree';
import { CreatePostScreen } from './MainScreensStack/CreatePostScreen';
import { CreateSpaceScreen } from './MainScreensStack/CreateSpaceScreen';
import { MainParamList } from '../utils/MainParamList';
import { SettingsScreen } from './extra-screens/settingsScreen';



export default function HomeScreen() {
  
  const [loggedIn , setLoggedIn] = useState(false);
  const Stack  = createStackNavigator<AuthParamList>(); 
  const MainStack = createStackNavigator<MainParamList>();

  const tryLogin = async () => {
    const userData = await AsyncStorage.getItem('userData') 
    console.log(userData)

   if(userData){
     setLoggedIn(true);
   } 
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
      <MainStack.Navigator initialRouteName="Main">
        <MainStack.Screen name = "Main" component={MainScreen}  options={{headerShown: false}}/>
        <MainStack.Screen name = "CreatePost" component={CreatePostScreen} options={{headerShown: false}} />
        <MainStack.Screen name = "CreateSpace" component={CreateSpaceScreen} options={{headerShown: false}} />
        <MainStack.Screen name = "Feed" component={FeedScreen} />
        <MainStack.Screen name = "Settings" component={SettingsScreen} />
        <MainStack.Screen name = "Profile" component={ProfileScreen} />
      </MainStack.Navigator>
     </NavigationContainer>
    )
}
