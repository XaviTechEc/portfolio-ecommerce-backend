import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserObjType } from '../users/user.type';
import { ShoppingCartProductItemType } from '../shared/shopping-cart-product-item.type';

@ObjectType()
export class ShoppingCartType {
  @Field(() => ID)
  id: string;

  // Relations
  @Field(() => [ShoppingCartProductItemType])
  shoppingCartProductItems: ShoppingCartProductItemType[];

  @Field(() => UserObjType)
  user: UserObjType;
}
