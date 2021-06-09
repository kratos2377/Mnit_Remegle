import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type MainParamList = {
  Main: undefined;
  CreatePost: undefined;
  CreateSpace: undefined;
  Feed: undefined;
  Settings: undefined;
  Profile: undefined;
  Login: undefined;
};

export type MainNavProps<T extends keyof MainParamList> = {
  navigation: StackNavigationProp<MainParamList, T>;
  route: RouteProp<MainParamList, T>;
};
