import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface VideoChatScreenProps {}

export const VideoChatScreen: React.FC<VideoChatScreenProps> = ({}) => {
  return (
    <SafeAreaView>
      <View>
        <Text>Video Screen</Text>
      </View>
    </SafeAreaView>
  );
};
