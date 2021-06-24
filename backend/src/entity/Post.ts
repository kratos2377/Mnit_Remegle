import { Field, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Spaces } from './Spaces';
import { Updoot } from './Updoot';
import { User } from './User';

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  postId: string;

  @Field()
  @Column('text')
  creatorId: string;

  @Field()
  @Column({ type: 'int', default: 0 })
  points!: number;

  @Field()
  @Column('text')
  title: string;

  @Field()
  @Column('text')
  content: string;

  @Field()
  @Column('text')
  postSpaceId: string;

  
  @Field(() => Int, { nullable: true })
  voteStatus: number | null; 

  @Field()
  @Column('text')
  spaceName: string;
  
  @Field()
  @Column('text' , {nullable: true})
  imageUrl: string

  @Field()
  @ManyToOne(() => User, (user) => user.posts)
  creator: User;

  @OneToMany(() => Updoot, (updoot) => updoot.post)
  updoots: Updoot[];

  @Field()
  @ManyToOne(() => Spaces, (spaces) => spaces.posts, {
    onDelete: 'CASCADE'
  })
  space: Spaces;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
