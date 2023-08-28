import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserObjType } from '../users/user.type';

@ObjectType()
export class ShoppingCartType {
  @Field(() => ID)
  id: string;

  @Field(() => UserObjType)
  user: UserObjType;
}
