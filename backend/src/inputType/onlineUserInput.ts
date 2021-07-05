import { Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class onlineUserInput {
  @Field()
  id!: string;

  @Field()
  @Length(1, 300)
  studentId!: string;

  @Field()
  @Length(1, 300)
  name!: string;

  @Field()
  @Length(1, 300)
  username!: string;

  @Field()
  avatarUrl!: string;

  @Field()
  gender!: string;
}
