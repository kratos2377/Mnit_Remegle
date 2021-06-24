import { Post } from '../entity/Post';
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware
} from 'type-graphql';
import { MyContext } from '../types';
import { getConnection } from 'typeorm';
import { isAuth } from '../middleware/isAuth';
import { User } from '../entity/User';
import { isBanned } from '../middleware/isBanned';
import { isGodAdmin } from '../middleware/isGodAdmin';
import { Spaces } from '../entity/Spaces';
import { Updoot } from '../entity/Updoot';

@ObjectType()
class PaginatedPosts {
  @Field(() => [Post])
  posts: Post[];
  @Field()
  hasMore: boolean;
}

@Resolver(Post)
export class PostResolver {
  @FieldResolver(() => String)
  textSnippet(@Root() post: Post) {
    return post.content.slice(0, 50);
  }

  @FieldResolver(() => User)
  creator(@Root() post: Post, @Ctx() { userLoader }: MyContext) {
    return userLoader.load(post.creatorId);
  }

  @FieldResolver(() => Int, { nullable: true })
  async voteStatus(
    @Root() post: Post,
    @Ctx() { updootLoader, req }: MyContext
  ) {
    if (!req.session.userId) {
      return null;
    }

    const updoot = await updootLoader.load({
      postId: post.postId,
      userId: req.session.userId
    });

    return updoot ? updoot.value : null;
  }

  @Query(() => Post)
  @UseMiddleware(isAuth)
  async getPostsById(@Arg('postId') postId: string): Promise<Post> {
    const post = (await Post.findOne({ where: { postId: postId } })) as Post;

    return post;
  }


  @Query(() => [Post], { nullable: true })
  async getAllPosts(): Promise<Post[] | null> {
    const posts = (await Post.find({})) as Post[];

    return posts;
  }

  @Query(() => PaginatedPosts)
  @UseMiddleware(isAuth)
  async getFeedPosts(
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => String, { nullable: true }) cursor: string | null,
    @Ctx() { req }: MyContext
  ): Promise<PaginatedPosts> {
    const realLimit = Math.min(50, limit);
    const reaLimitPlusOne = realLimit + 1;

    const replacements: any[] = [reaLimitPlusOne];

    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
    }

    const posts = await getConnection()
      .createQueryBuilder(Post, 'post')
      .innerJoin(User, 'user', 'post.postSpaceId = ANY(user.spacesFollowed)')
      .orderBy('post."createdAt"', 'DESC')
      .where('user.id = :id', { id: req.session.userId })
      .getMany();

   
      return {
        posts: posts.slice(0, realLimit),
        hasMore: posts.length === reaLimitPlusOne,
      };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async vote(
    @Arg('postId') postId: string,
    @Arg('value', () => Int) value: number,
    @Ctx() { req }: MyContext
  ) {
    const isUpdoot = value !== -1;
    const realValue = isUpdoot ? 1 : -1;
    const { userId } = req.session;

    const updoot = await Updoot.findOne({
      where: { postId: postId, userId: userId }
    });

    // the user has voted on the post before
    // and they are changing their vote
    if (updoot && updoot.value !== realValue) {
      await getConnection().transaction(async (tm) => {
        await tm.query(
          `
    update updoot
    set value = $1
    where "postId" = $2 and "userId" = $3
        `,
          [realValue, postId, userId]
        );

        await tm.query(
          `
          update post
          set points = points + $1
          where "postId" = $2
        `,
          [2 * realValue, postId]
        );
      });
    } else if (!updoot) {
      // has never voted before
      await getConnection().transaction(async (tm) => {
        await tm.query(
          `
    insert into updoot ("userId", "postId", value)
    values ($1, $2, $3)
        `,
          [userId, postId, realValue]
        );

        await tm.query(
          `
    update post
    set points = points + $1
    where "postId" = $2
      `,
          [realValue, postId]
        );
      });
    }
    return true;
  }

  @Query(() => [Post], { nullable: true })
  @UseMiddleware(isAuth)
  async getPostsByUserId(@Arg('id') id: string): Promise<Post[] | null> {
    const postsArray = Post.find({ where: { creatorId: id } });

    return postsArray;
  }

  @Query(() => [Post])
  @Query(() => Boolean)
  @UseMiddleware(isAuth)
  async checkifUserFollowSpace(
    @Arg('spaceName') spaceName: string,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const space = (await Spaces.findOne({
      where: { spaceName: spaceName }
    })) as Spaces;

    if (space.followingIds.includes(req.session.userId)) {
      return false;
    }

    return true;
  }

  @Mutation(() => Post, { nullable: true })
  @UseMiddleware(isAuth)
  @UseMiddleware(isBanned)
  async createPosts(
    @Arg('title') title: string,
    @Arg('content') content: string,
    @Arg('spaceName') spaceName: string,
    @Ctx() { req }: MyContext
  ): Promise<Post | null> {
    let space = (await Spaces.findOne({
      where: { spaceName: spaceName }
    })) as Spaces;

    if (!space) {
      return null;
    }

    if (space.bannedUserIds.includes(req.session.userId)) {
      return null;
    }

    const post = await Post.create({
      title: title,
      content: content,
      postSpaceId: space.spaceId,
      creatorId: req.session.userId,
      spaceName: spaceName
    }).save();

    return post;
  }

  @Query(() => [Post], { nullable: true })
  @UseMiddleware(isAuth)
  async getAllUserPosts(@Ctx() { req }: MyContext): Promise<Post[] | null> {
    const result = await Post.find({
      where: { creatorId: req.session.userId }
    });

    return result.reverse();
  }

  @Mutation(() => Post, { nullable: true })
  @UseMiddleware(isAuth)
  @UseMiddleware(isBanned)
  async updatePost(
    @Arg('postId') postId: string,
    @Arg('title') title: string,
    @Arg('content') content: string,
    @Ctx() { req }: MyContext
  ): Promise<Post | null> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Post)
      .set({ title, content })
      .where('postId = :postId and "creatorId" = :creatorId', {
        postId,
        creatorId: req.session.userId
      })
      .returning('*')
      .execute();

    return result.raw[0];
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deletePost(
    @Arg('postId') postId: string,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    await Post.delete({ postId: postId, creatorId: req.session.userId });
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  @UseMiddleware(isGodAdmin)
  async godDeletePost(@Arg('postId') postId: string): Promise<boolean> {
    await Post.delete({ postId: postId });
    return true;
  }

  // @Mutation(() => Boolean)
  // @UseMiddleware(isAuth)
  // async strikePostandUser(
  //   @Arg("postId") postId: string,
  // ): Promise<boolean> {
  //   const post = await Post.findOne({where: {postId: postId}})

  //   await User.update({studentId: post?.creatorId} , {
  //     striked = striked + 1
  //   })
  // }
}
