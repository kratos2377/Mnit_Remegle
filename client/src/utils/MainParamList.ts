import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type MainParamList = {
  Main: undefined;
  CreatePost: undefined;
  CreateSpace: undefined;
  SearchScreen: undefined;
  Feed: undefined;
  Settings: undefined;
  Profile: undefined;
  YourSpaces: undefined;
  UpdateScreen: undefined
  GoToProfile: undefined,
  GoToSpace: undefined;
  EditPostScreen: undefined;
  ForgotPassword: undefined;
  EditSpaceScreen: undefined;
};

export type MainNavProps<T extends keyof MainParamList> = {
  navigation: StackNavigationProp<MainParamList, T>;
  route: RouteProp<MainParamList, T>;
};
