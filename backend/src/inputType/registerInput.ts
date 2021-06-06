import { IsEmail, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { IsEmailAlreadyExist } from './isEmailAlreadyExist';
import { IsUsernameAlreadyExist } from './isUsernameAlreadyExist';

@InputType()
export class RegisterInput {
  @Field()
  @Length(1, 300)
  studentId!: string;

  @Field()
  @Length(1, 300)
  firstName!: string;

  @Field()
  @Length(1, 300)
 lastName!: string;

  @Field()
  @Length(1, 300)
  @IsUsernameAlreadyExist({ message: 'Username Already Exists' })
  username!: string;

  @Field()
  password!: string;

  @Field()
  gender!: string;

  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: 'Email Already Exists' })
  email!: string;
}
