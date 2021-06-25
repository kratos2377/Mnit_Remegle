import { UserType } from "./UserType";


export type PostsType = {
    id: string,
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