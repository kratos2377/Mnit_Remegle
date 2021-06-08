import React from 'react'
import { View , Text} from 'react-native';
import { MainNavProps } from '../../utils/MainParamList';

interface CreatePostScreenProps {

}

export const CreatePostScreen = ({ navigation }: MainNavProps<"CreatePost">) => {
        return (
            <View>
            <Text>Create Posts Here</Text>
        </View>

        );
}