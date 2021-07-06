import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class OnlineUser extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn('text')
  id!: string;

  @Field()
  @Column('text')
  studentId!: string;

  @Field()
  @Column('text')
  name!: string;

  @Field()
  @Column('text')
  username!: string;

  @Field()
  @Column('text')
  avatarUrl!: string;

  @Field()
  @Column('text', { default: 'free' })
  status!: string;

  @Field()
  @Column()
  gender!: string;
}
