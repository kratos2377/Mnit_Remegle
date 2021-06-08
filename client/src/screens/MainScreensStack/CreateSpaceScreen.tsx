import React from 'react'
import { View , Text } from 'react-native';
import { MainNavProps } from '../../utils/MainParamList';

interface CreateSpaceScreenProps {

}

export const CreateSpaceScreen = ({ navigation } : MainNavProps<"CreateSpace">) => {
        return (
            <View>
                <Text>Create Space Here</Text>
            </View>
        );
}