import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserObjType } from 'src/users/domain/object-types/user.type';

@ObjectType()
export class ShoppingCartType {
  @Field(() => ID)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  // Relations
  @Field(() => UserObjType)
  user: UserObjType;

  //? Unnecessary field - query in parent
  // @Field(() => [ShoppingCartProductItemType])
  // shoppingCartProductItems: ShoppingCartProductItemType[];
}
