import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  SafeAreaView,
  Image
} from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import {
  ActivityIndicator,
  Button,
  Colors,
  Searchbar
} from 'react-native-paper';
import {
  RegularSpaceFragment,
  RegularUserFragment,
  useSearchQueryMutation
} from '../../generated/graphql';
import { MainNavProps } from '../../utils/MainParamList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

export const SearchScreen = ({
  navigation,
  route
}: MainNavProps<'SearchScreen'>) => {
  const [searchText, setSearchText] = useState('');
  const [userId, setUserId] = useState('');
  const [search] = useSearchQueryMutation();
  var [searchFeedSpaces, setSpaces] = useState<RegularSpaceFragment[]>([]);
  var [searchFeedUsers, setUsers] = useState<RegularUserFragment[]>([]);

  const [display, setDispaly] = useState<'Users' | 'Spaces'>('Users');
  const [displayItem, setDisplayItem] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [searched, setSearched] = useState(false);
  const searchHandler = async () => {
    if (searchText == '') {
      setSpaces([]);
      setUsers([]);
      setSearched(false);
      return;
    }

    setSpinner(true);

    const values = {
      searchName: searchText
    };
    const response = await search({ variables: values });

    setSpaces([...response.data?.searchQuery?.spaces]);
    setUsers([...response.data?.searchQuery?.users]);

    setSpinner(false);
    setSearched(true);
  };

  const changeSpaces = (id: string) => {
    const newSpaces = searchFeedSpaces.filter(
      (spaceItem) => spaceItem.id !== id
    );

    setSpaces([...newSpaces]);
  };

  useEffect(() => {
    if (searchText === '') {
      setSpaces([]);
      setUsers([]);
      setSearched(false);
    }
  }, [searchText]);

  useEffect(() => {
    const extractUserId = async () => {
      const userData = await AsyncStorage.getItem('userData');

      const newData = JSON.parse(userData);
      setUserId(newData.id);
    };

    extractUserId();
  }, []);

  const renderUserItem = (item) => {
    return userId !== item.item.id ? (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('GoToProfile', {
            id: item.item.id
          })
        }
      >
        <View style={{ margin: 10 }}>
          <ListItem key={item.item.id} bottomDivider>
            <Avatar source={{ uri: item.item.avatarUrl }} />
            <ListItem.Content>
              <ListItem.Title style={{ color: 'black' }}>
                {item.item.fullName}
              </ListItem.Title>
              <ListItem.Subtitle>{item.item.studentId}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        </View>
      </TouchableOpacity>
    ) : null;
  };

  const renderSpaceItem = (item) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('GoToSpace', {
          id: item.item.id,
          spaceFn: changeSpaces
        })
      }
    >
      <View style={{ margin: 10 }}>
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
    <SafeAreaView style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
      <ScrollView>
        <Searchbar
          style={{ marginBottom: 10, flex: 1 }}
          placeholder="Search Here..."
          onChangeText={(value) => {
            setSearchText(value);

            if (value.trim().length == 0) {
              setSpaces([]);
              setSpaces([]);
              setSearched(false);
            }
          }}
          value={searchText}
          onIconPress={searchHandler}
        />
        {spinner ? (
          <ActivityIndicator />
        ) : searchFeedSpaces.length !== 0 || searchFeedUsers.length !== 0 ? (
          <View style={{ flex: 1, width: '100%' }}>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'space-around'
              }}
            >
              <Button icon="account" onPress={() => setDispaly('Users')}>
                Users
              </Button>
              <Button icon="bank" onPress={() => setDispaly('Spaces')}>
                Spaces
              </Button>
            </View>

            {display === 'Users' ? (
              searchFeedUsers.length === 0 ? (
                <View style={{ alignSelf: 'center', marginTop: 10 }}>
                  <Text style={{ fontSize: 20 }}>
                    No Users With This Name Exist
                  </Text>
                </View>
              ) : (
                <FlatList
                  data={searchFeedUsers}
                  keyExtractor={(item) => item.id}
                  renderItem={renderUserItem}
                />
              )
            ) : searchFeedSpaces.length === 0 ? (
              <View style={{ alignSelf: 'center', marginTop: 10 }}>
                <Text style={{ fontSize: 20 }}>
                  No Spaces With This Name Exist
                </Text>
              </View>
            ) : (
              <FlatList
                data={searchFeedSpaces}
                keyExtractor={(item) => item.id}
                renderItem={renderSpaceItem}
              />
            )}
          </View>
        ) : searched ? (
          <View
            style={{
              alignSelf: 'center',
              alignContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text style={{ fontSize: 20, margin: 20 }}>No Results Found </Text>
            <Image
              source={{
                uri: 'https://media.giphy.com/media/zLCiUWVfex7ji/source.gif'
              }}
              style={{
                width: 300,
                height: 300
              }}
            />
          </View>
        ) : (
          <View style={{ alignSelf: 'center' }}>
            <Text>Press Top Left Search Icon To Start Searching </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
