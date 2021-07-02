import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
  Text
} from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetAllSpacesByUserQuery } from '../../generated/graphql';
import { MainNavProps } from '../../utils/MainParamList';

interface YourSpacesProps {}

export const YourSpaces = ({ navigation }: MainNavProps<'YourSpaces'>) => {
  const { data, loading, variables } = useGetAllSpacesByUserQuery();

  const renderSpaceItem = (item) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('GoToSpace', {
          id: item.item.id
        })
      }
    >
      <View>
        <ListItem key={item.item.id} bottomDivider>
          <Avatar source={{ uri: item.item.spaceAvatarUrl }} />
          <ListItem.Content>
            <ListItem.Title style={{ color: 'black' }}>
              {item.item.spaceName}
            </ListItem.Title>
            <ListItem.Subtitle>{item.item.type}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        {loading ? (
          <ActivityIndicator />
        ) : data?.getAllSpacesofUser?.length === 0 ? (
          <Text>You Have Not Created Any Spaces</Text>
        ) : (
          <FlatList
            data={data?.getAllSpacesofUser}
            keyExtractor={(item) => item.id}
            renderItem={renderSpaceItem}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
