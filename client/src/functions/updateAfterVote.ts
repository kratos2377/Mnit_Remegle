import { ApolloCache } from "@apollo/client";
import { VoteMutation } from "../generated/graphql";
import gql from "graphql-tag";

export const updateAfterVote = (
  value: number,
  postId: string,
  cache: ApolloCache<VoteMutation>
) => {
  const data = cache.readFragment<{
    postId: string;
    points: number;
    voteStatus: number | null;
  }>({
    id: "Post:" + postId,
    fragment: gql`
      fragment _ on Post {
        postId
        points
        voteStatus
      }
    `,
  });
 console.log(1)
  console.log(data)

  if (data) {
    if (data.voteStatus === value) {
      return;
    }
    const newPoints =
      (data.points as number) + (!data.voteStatus ? 1 : 2) * value;
    cache.writeFragment({
      id: "Post:" + postId,
      fragment: gql`
        fragment __ on Post {
          points
          voteStatus
        }
      `,
      data: { points: newPoints, voteStatus: value },
    });
  }
};
