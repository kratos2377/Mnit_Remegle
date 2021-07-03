import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface VideoChatScreenProps {}

export const VideoChatScreen: React.FC<VideoChatScreenProps> = ({}) => {
  return (
    <SafeAreaView>
      <View
        style={{
          flex: 1,
          width: '100%',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: 100
        }}
      >
        <Text style={{ fontSize: 25 }}>Yha Pr aayega Omegele apna</Text>
      </View>
    </SafeAreaView>
  );
};
