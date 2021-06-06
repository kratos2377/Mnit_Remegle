import React , {useEffect} from "react";
import { View, Text } from "react-native";
import { FeedPostsCard } from "../../components/FeedPostsCard";
import { useGetFeedPostsQuery } from "../../generated/graphql";

interface FeedScreenProps {}

export const FeedScreen: React.FC<FeedScreenProps> = ({}) => {
 
  
  
  const { data, error, loading,  variables } = useGetFeedPostsQuery({
    variables: {
      limit: 15,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });




  return (
    <View>
      {
        data == null ? <Text>No Data</Text> : data.getFeedPosts.map((item) => <FeedPostsCard post={item}/>
        )
      }

    </View>
  );
};
