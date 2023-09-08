import { Field, ObjectType } from '@nestjs/graphql';
import { UserObjType } from '../users/user.type';

@ObjectType()
export class AuthType {
  @Field(() => UserObjType)
  user: UserObjType;

  @Field(() => String)
  token: string;
}
