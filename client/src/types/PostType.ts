import { UserType } from "./UserType";


export type PostsType = {
    postId: string,
    creatorId: string,
    points: number,
    title: string,
    voteStatus: number,
    content: string,
    postSpaceId: string,
    spaceName: string,
    createdAt: Date,
    creator: UserType
}