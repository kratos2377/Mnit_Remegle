import React from "react";
import { View, Text } from "react-native";
import { Appbar } from "react-native-paper";
import { MainNavProps } from "../../utils/MainParamList";

interface GoToSpaceScreenProps {}

export const GoToSpaceScreen = ({
  navigation,
  route,
}: MainNavProps<"GoToSpace">) => {
  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.pop()} />
        <Appbar.Content title="Title" subtitle="Subtitle" />
      </Appbar.Header>
    </View>
  );
};
