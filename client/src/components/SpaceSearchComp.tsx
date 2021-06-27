import React from 'react'
import { TouchableOpacity, View } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { RegularSpaceFragment } from '../generated/graphql';

interface SpaceSearchCompProps {
 space: RegularSpaceFragment
}

export const SpaceSearchComp: React.FC<SpaceSearchCompProps> = ({ space }) => {
        return (
                <TouchableOpacity onPress={() => console.log(space.id)}>
                 <View>
                 <ListItem key={space.id} bottomDivider>
        <Avatar source={{uri: space.spaceAvatarUrl}} />
        <ListItem.Content>
          <ListItem.Title>{space.spaceName}</ListItem.Title>
          <ListItem.Subtitle>{space.type}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem> 
                 </View>
                </TouchableOpacity>
        );
}