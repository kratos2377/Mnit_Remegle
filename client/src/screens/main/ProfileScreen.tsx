import React , {useState , useEffect} from "react";
import { View, Text, ScrollView, Image, FlatList } from "react-native";
import { Avatar, Card, Colors, IconButton } from "react-native-paper";
import { SocialIcon } from "react-native-elements";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useGetAllUserPostsQuery } from "../../generated/graphql";

interface ProfileScreenProps {}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({}) => {


  const [postsItem  , setPostsItem] = useState([])
  const { data, error, variables } = useGetAllUserPostsQuery();

  console.log(data);



  const rightContent = () => (
    <IconButton
      icon="camera"
      color={Colors.black}
      size={20}
      onPress={() => console.log("Pressed")}
    />
  );

  const LeftContent = (url: string) => (
    <Image style={{ width: 50, height: 50 }} source={{ uri: url }} />
  );

  const renderPostItem = (item) => (
    <Card style={{ margin: 10 }}>
      <Card.Title
        title={item.item.creator.fullName}
        subtitle={item.item.creator.studentId}
        left={() => LeftContent(item.item.creator.avatarUrl)}
      />

      <Text style={{ margin: 10, color: "black" }}>{item.item.title}</Text>
      <Text style={{ color: "black" }}>{item.item.content}</Text>

      <View style={{ flexDirection: "row"}}>
        <IconButton
          icon="chevron-up-box-outline"
          size={20}
          onPress={() => console.log("upvote")}
        />
        <IconButton
          icon="chevron-down-box-outline"
          size={20}
          onPress={() => console.log("downvote")}
        />
      </View>
    </Card>
  );

  return (
    <View style={{ flex: 1, width: '100%' }}>
      <ScrollView>
        <View style={{ marginBottom: 10 }}>
          <Card>
            <Card.Title
              title="necro"
              subtitle="2019ucp1403"
              right={rightContent}
            />
          </Card>
        </View>

        <View style={{ marginBottom: 10 }}>
          <Card>
            <Avatar.Image
              size={200}
              source={require("../../../assets/doomSlayer.png")}
            />
            <Text>Doom Slayer</Text>
            <Text>Bio</Text>
            <View>
              <SocialIcon
                type="instagram"
                onPress={() => console.log("Instagram")}
              />
              <SocialIcon
                type="twitter"
                onPress={() => console.log("twitter")}
              />
            </View>
          </Card>
        </View>
        <View style={{flex: 1}}>
          <FlatList
          numColumns={1}
            data={data?.getAllUserPosts}
            keyExtractor={(item) => item.postId}
            renderItem={renderPostItem}
          />
        </View>
       
      </ScrollView>
    
    </View>
  );
};
