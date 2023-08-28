import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Gender, Role, UserType } from 'src/core/enums';

@ObjectType()
export class UserObjType {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  fullName: string;

  @Field(() => String, { nullable: true })
  phoneNumber?: string;

  @Field(() => UserType)
  userType: UserType;

  @Field(() => Role)
  role: Role;

  @Field(() => Gender)
  gender: Gender;

  @Field(() => String, { nullable: true })
  avatarImg?: string;

  @Field(() => Boolean)
  active: boolean;

  @Field(() => String, { nullable: true })
  lastConnection?: Date;
}
