import { Field, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class MnitStudent extends BaseEntity {
  @Field()
  @PrimaryColumn('text')
  studentId!: string;

  @Field()
  @Column('bool', { default: false })
  isConfirmed!: boolean;
}
