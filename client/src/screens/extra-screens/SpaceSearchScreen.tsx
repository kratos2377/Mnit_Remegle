import React from 'react'
import { View , Text } from 'react-native';
import { RegularSpaceFragment } from '../../generated/graphql';

interface SpaceSearchScreenProps {
 spaces: RegularSpaceFragment[]
}

export const SpaceSearchScreen: React.FC<SpaceSearchScreenProps> = ({ spaces }) => {
    console.log("Space Serach Screen")
  console.log(spaces)
    if(spaces === undefined)
     spaces = []

        return (
            <View>
               {
                   spaces.length === 0 ? <Text>No Search</Text> : <Text>Length is {spaces.length}</Text>
               }
            </View>
        );
}