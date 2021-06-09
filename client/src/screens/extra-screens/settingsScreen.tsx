import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Icon, ListItem } from "react-native-elements";
import { Card, List } from "react-native-paper";

interface settingsScreenProps {}

export const SettingsScreen: React.FC<settingsScreenProps> = ({}) => {
  const list = [
    {
      title: "Appointments",
      icon: "av-timer",
    },
    {
      title: "Trips",
      icon: "flight-takeoff",
    },
  ];

  return (
    <View>
      <ScrollView>
        <Card style={{ marginVertical: 10 , padding: 10 }}>
          <List.Item
            title="Logout"
            description="Logout From App"
            left={(props) => <List.Icon {...props} icon="logout" />}
            onPress={() => console.log("Logout")}
          />
        </Card>
        <Card style={{ marginVertical: 10 , padding: 10 }}>
          <List.Item
            title="Your Spaces"
            description="Check All Of The Spaces You Have Created"
            left={(props) => <List.Icon {...props} icon="postage-stamp" />}
            onPress={() => console.log("Your Spaces")}
          />
        </Card>
        <Card style={{ marginVertical: 10 , padding: 10 }}>
          <List.Item
            title="Edit Profile"
            description="Update Your Details"
            left={(props) => <List.Icon {...props} icon="account-edit" />}
            onPress={() => console.log("Edit Profile")}
          />
        </Card>
      </ScrollView>
    </View>
  );
};
