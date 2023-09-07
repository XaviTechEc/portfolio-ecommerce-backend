import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserObjType } from '../users/user.type';
// import { ShoppingCartProductItemType } from '../shared/shopping-cart-product-item.type';

@ObjectType()
export class ShoppingCartType {
  @Field(() => ID)
  id: string;

  // Relations
  @Field(() => UserObjType)
  user: UserObjType;

  //? Unnecessary field - query in parent
  // @Field(() => [ShoppingCartProductItemType])
  // shoppingCartProductItems: ShoppingCartProductItemType[];
}
