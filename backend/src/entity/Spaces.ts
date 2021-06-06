import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Post } from './Post';

@ObjectType()
@Entity()
export class Spaces extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  spaceId: string;

  @Field()
  @Column('text')
  adminId: string;

  @Field()
  @Column('text', { default: 'public' })
  type: string;

  @Field()
  @Column('text', { unique: true })
  spaceName!: string;

  @Field()
  @Column('text')
  spaceDescription: string;

  @Field()
  @Column('text', {
    default: 'https://www.health.gov.au/sites/default/files/contact-group_0.jpg'
  })
  spaceAvatarUrl: string;

  @OneToMany(() => Post, (post) => post.space)
  posts: Post[];

  @Column('text', { array: true, default: [] })
  bannedUserIds: string[];

  @Column('text', { array: true, default: [] })
  followingIds: string[];
}
