import { isAuth } from '../middleware/isAuth';
import {
  Arg,
  Field,
  Mutation,
  ObjectType,
  Resolver,
  UseMiddleware
} from 'type-graphql';
import { Spaces } from '../entity/Spaces';
import { User } from '../entity/User';
import { getConnection } from 'typeorm';

@ObjectType()
class UserandSpaces {
  @Field(() => [User], { nullable: true })
  users: User[];

  @Field(() => [Spaces], { nullable: true })
  spaces: Spaces[];
}

@Resolver()
export class SearchResolver {
  @Mutation(() => UserandSpaces, { nullable: true })
  @UseMiddleware(isAuth)
  async searchQuery(
    @Arg('searchName') searchName: string
  ): Promise<UserandSpaces | null> {
    // const usersFirst = await User.find({where: {firstName: searchName }}) as User[]
    // const usersLast = await User.find({where: { lastName: searchName }}) as User[]
    // const usersUsername = await User.find({where: {username: searchName }}) as User[]

    let users = await getConnection()
      .getRepository(User)
      .createQueryBuilder('l')    
      .orWhere('l.firstName ilike :firstName', { firstName: `%${searchName}%` })
      .orWhere('l.lastName ilike :lastName', { lastName: `%${searchName}%` })
      .orWhere('l.lastName ilike :username', { username: `%${searchName}%` })
      .getMany();

    const spaces = await getConnection()
    .getRepository(Spaces)
    .createQueryBuilder('l')
    .where('l.spaceName ilike :spaceName', { spaceName: `%${searchName}%` })
    .getMany();

    return {
      users: [...users],
      spaces: [...spaces]
    };
  }
}
