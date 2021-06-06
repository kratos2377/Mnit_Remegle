import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Avatar, Card, Colors, IconButton } from "react-native-paper";
import { SocialIcon } from 'react-native-elements'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

interface ProfileScreenProps {}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({}) => {
  const rightContent = () => (
    <IconButton
      icon="camera"
      color={Colors.black}
      size={20}
      onPress={() => console.log("Pressed")}
    />
  );

  return (
    <View>
      <ScrollView>
        <View style={{marginBottom: 10}}>
          <Card>
            <Card.Title
              title="necro"
              subtitle="2019ucp1403"
              right={rightContent}
            />
          </Card>
        </View>
        
        <View style={{marginBottom: 10}}>
        <Card>
        <Avatar.Image size={200} source={require('../../../assets/doomSlayer.png')} />
        <Text>Doom Slayer</Text>
        <Text>Bio</Text>
        <View>
            <SocialIcon type='instagram' onPress={() => console.log("Instagram")} />
            <SocialIcon type='twitter' onPress={() => console.log("twitter")} />
        </View>
            </Card>          
        </View>

        <View>
            <Text>Posts Will Lie Here</Text>
        </View>

      </ScrollView>
    </View>
  );
};
