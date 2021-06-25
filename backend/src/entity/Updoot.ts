import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Post } from './Post';
import { User } from './User';

@Entity()
export class Updoot extends BaseEntity {
  @Column({ type: 'int' })
  value: number;

  @PrimaryColumn('text')
  userId: string;

  @ManyToOne(() => User, (user) => user.updoots)
  user: User;

  @PrimaryColumn('text')
  id: string;

  @ManyToOne(() => Post, (post) => post.updoots, {
    onDelete: 'CASCADE'
  })
  post: Post;
}
