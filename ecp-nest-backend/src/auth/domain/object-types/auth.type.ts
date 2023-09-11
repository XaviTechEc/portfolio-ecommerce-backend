import { ObjectType, Field } from '@nestjs/graphql';
import { UserObjType } from 'src/users/domain/object-types/user.type';

@ObjectType()
export class AuthType {
  @Field(() => UserObjType)
  user: UserObjType;

  @Field(() => String)
  token: string;
}
