import { Field, Float, ID } from '@nestjs/graphql';
import { ShoppingCartType } from '../cart/shopping-cart.type';
import { ProductItemType } from '../products/product-item.type';

export class ShoppingCartProductItemType {
  @Field(() => ID)
  id: string;

  @Field(() => ShoppingCartType)
  shoppingCart: ShoppingCartType;

  @Field(() => ProductItemType)
  productItemId: ProductItemType;

  @Field(() => Float)
  quantity: number;
}
