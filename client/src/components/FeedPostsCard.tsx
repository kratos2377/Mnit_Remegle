import React from 'react'
import { Avatar, Card, IconButton } from 'react-native-paper';
import {Text, View , Image} from 'react-native'
import { PostsType } from '../types/PostType';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { PostSnippetFragment } from '../generated/graphql';

interface FeedScreenProps {
        post: PostSnippetFragment
}

export const FeedPostsCard: React.FC<FeedScreenProps> = ( {post}) => {


        const LeftContent = (url: string) =>   <Image
        style={{width: 50, height: 50}}
        source={{uri: url}}
      />
        return (
                <Card>
                  <Card.Title title={post.creator.fullName} subtitle={post.creator.studentId} left={ () => LeftContent(post.creator.avatarUrl)} />

                  <Text  style={{margin: 10 , color: 'black'}}>{post.title}</Text> 
                  <Text style={{color: 'black'}}>{post.content}</Text> 
                
                <View style={{flexDirection: 'row' , flex: 1}}>
                    <IconButton icon="chevron-up-box-outline" size = {20} onPress={() => console.log("upvote")}/>     
                    <IconButton icon="chevron-down-box-outline" size = {20} onPress={() => console.log("downvote")} />     
                </View>

                </Card>
        );
}