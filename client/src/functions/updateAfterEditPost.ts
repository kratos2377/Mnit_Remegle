import { ApolloCache } from "@apollo/client";
import { UpdatePostMutation } from "../generated/graphql";
import gql from "graphql-tag";

export const updateAfterPost = (
    postId: string,
    title: string,
    content: string,
  cache: ApolloCache<UpdatePostMutation>
) => {
  const data = cache.readFragment<{
    postId: string;
    title: string,
    content: string,
  }>({
    id: "Post:" + postId,
    fragment: gql`
      fragment _ on Post {
        id
        title
        content
      }
    `,
  });
console.log(data)
  cache.writeFragment({
    id: "Post:" + postId,
    fragment: gql`
      fragment __ on Post {
        points
        voteStatus
      }
    `,
    data: { title: title, content: content },
  });
}