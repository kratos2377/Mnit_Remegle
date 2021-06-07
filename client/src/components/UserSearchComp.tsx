import React from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'
import { RegularUserFragment } from '../generated/graphql';

interface UserSearchCompProps {
  user: RegularUserFragment
}

export const UserSearchComp: React.FC<UserSearchCompProps> = ({ user }) => {
        console.log("User Search Data here")
        console.log(user)
        return (
             <TouchableOpacity onPress={() => console.log(user.id)}>
                        <View>
                       <ListItem key={user.id} bottomDivider>
        <Avatar source={{uri: user.avatarUrl}} />
        <ListItem.Content>
          <ListItem.Title>{user.fullName}</ListItem.Title>
          <ListItem.Subtitle>{user.studentId}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
                </View>
             </TouchableOpacity>
        );
}