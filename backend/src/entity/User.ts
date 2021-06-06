import { Field, ID, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany
} from 'typeorm';
import { Post } from './Post';
import { Updoot } from './Updoot';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @Column('text', { unique: true })
  studentId!: string;

  @Field()
  @Column('text')
  firstName!: string;

  @Field()
  @Column('text')
  lastName!: string;
 
  @Field()
  public get fullName() : string {
    return `${this.firstName} ${this.lastName}`
  }

  @Field()
  @Column('text', { unique: true })
  username!: string;

  @Field()
  @Column('text', { unique: true })
  email!: string;

  @Field()
  @Column('text')
  gender!: string;

  @Field()
  @Column('bool', { default: false })
  godAdmin!: boolean;

  @Field()
  @Column('bool', { default: true })
  isConfirmed!: boolean;

  @Field()
  @Column('text')
  password!: string;

  @Field()
  @Column({
    type: 'text',
    default:
      'https://image.shutterstock.com/image-vector/blank-avatar-placeholder-on-transparent-600w-1097191784.jpg'
  })
  avatarUrl!: string;

  @Field()
  @Column('bool', { default: false })
  isBanned: boolean;

  @Field()
  @Column('int', { default: 0 })
  striked: number;

  @Field()
  @Column({ type: 'text', nullable: true, default: '' })
  bio: string;

  @Field()
  @Column({ type: 'text', nullable: true, default: '' })
  instagramAcc!: string;

  @Field()
  @Column({ type: 'text', nullable: true, default: '' })
  twitterAcc!: string;

  @OneToMany(() => Updoot, (updoot) => updoot.user)
  updoots: Updoot[];

  @OneToMany(() => Post, (post) => post.creator, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  posts: Post[];

  @Column('text', { array: true, default: [] })
  spacesFollowed: string[];
}
