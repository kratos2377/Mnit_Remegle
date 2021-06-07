import React, { useEffect } from "react";
import { View, Text, Image, FlatList } from "react-native";
import { Card, IconButton } from "react-native-paper";
import { FeedPostsCard } from "../../components/FeedPostsCard";
import { useGetFeedPostsQuery } from "../../generated/graphql";

interface FeedScreenProps {}

export const FeedScreen: React.FC<FeedScreenProps> = ({}) => {
  const { data, error, loading, variables } = useGetFeedPostsQuery({
    variables: {
      limit: 15,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });

  const LeftContent = (url: string) => (
    <Image style={{ width: 50, height: 50 }} source={{ uri: url }} />
  );

  const renderPostCardItem = (item) => (
    <Card style={{ margin: 10, flex: 1 }}>
      <Card.Title
        title={item.item.creator.fullName}
        subtitle={item.item.creator.studentId}
        left={() => LeftContent(item.item.creator.avatarUrl)}
      />

      <Text style={{ margin: 10, color: "black" }}>{item.item.title}</Text>
      <Text style={{ color: "black" }}>{item.item.content}</Text>

      <View style={{ flexDirection: "row" }}>
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
      {data == null ? (
        <Text>No Data</Text>
      ) : (
        <FlatList
          data={data?.getFeedPosts}
          keyExtractor={(item) => item.postId}
          renderItem={renderPostCardItem}
        />
      )}
    </View>
  );
};
