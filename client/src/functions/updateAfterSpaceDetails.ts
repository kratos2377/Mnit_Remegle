import { ApolloCache } from "@apollo/client";
import { UpdateSpaceDetailsMutation } from "../generated/graphql";
import gql from "graphql-tag"

export const updateAfterSpaceDetails = (
    spaceId: string,
    spaceName: string,
    spaceDescription: string,
    cache: ApolloCache<UpdateSpaceDetailsMutation>
) => {
    const data = cache.readFragment<{
        spaceId: string;
      }>({
        id: "Spaces:" + spaceId,
        fragment: gql`
          fragment _ on Spaces {
            id
          }
        `,
      });

      cache.writeFragment({
        id: "Spaces:" + spaceId,
        fragment: gql`
          fragment __ on Spaces {
            spaceName,
            spaceDescription,
          }
        `,
        data: { spaceName: spaceName , spaceDescription: spaceDescription },
      });
}