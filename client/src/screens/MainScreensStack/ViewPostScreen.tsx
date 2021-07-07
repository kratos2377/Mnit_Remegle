import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ViewPostScreenProps {}

export const ViewPostScreen: React.FC<ViewPostScreenProps> = ({}) => {
  return (
    <SafeAreaView>
      <View>
        <Text>View Post Screen</Text>
      </View>
    </SafeAreaView>
  );
};
