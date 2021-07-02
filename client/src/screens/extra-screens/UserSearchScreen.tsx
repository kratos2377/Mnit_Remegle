import React from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { UserSearchComp } from '../../components/UserSearchComp';
import { RegularUserFragment } from '../../generated/graphql';

interface UserSearchScreenProps {
  users: [RegularUserFragment];
}

export const UserSearchScreen: React.FC<UserSearchScreenProps> = ({
  users
}) => {
  const renderUserItem = (item: RegularUserFragment) => (
    <TouchableOpacity onPress={() => console.log(item.id)}>
      <View>
        <ListItem key={item.id} bottomDivider>
          <Avatar source={{ uri: item.avatarUrl }} />
          <ListItem.Content>
            <ListItem.Title>{item.fullName}</ListItem.Title>
            <ListItem.Subtitle>{item.studentId}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      {users === undefined ? (
        <Text>No users found. Check Your Spaces Tab</Text>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={renderUserItem}
        />
      )}
    </View>
  );
};
