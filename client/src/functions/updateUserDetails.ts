import { ApolloCache } from "@apollo/client"
import { UpdateUserMutation } from "../generated/graphql"
import gql from "graphql-tag";


export const updateUserDetails = (
    id: string,
    username: string,
    bio: string | undefined,
    twitterAcc: string | undefined,
    instagramAcc: string | undefined,
    cache: ApolloCache<UpdateUserMutation>
) => {
    const data = cache.readFragment<{
        id: string,        
    }>({
        id: "User:" + id,
        fragment: gql `
          fragment _ on User {
              id
          }
        `
    });

    console.log("User here")
    console.log(data)

if(data){
    
    cache.writeFragment({
        id: "User:" + id,
        fragment: gql `
         fragment __ on User {
             username
             bio
             avatarUrl
         }
        `,
        data: {username: username , bio: bio  , twitterAcc: twitterAcc , instagramAcc: instagramAcc}
    }); 
}
}