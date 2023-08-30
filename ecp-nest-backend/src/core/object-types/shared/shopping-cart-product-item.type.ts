import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { ShoppingCartType } from '../cart/shopping-cart.type';
import { ProductItemType } from '../products/product-item.type';

@ObjectType()
export class ShoppingCartProductItemType {
  @Field(() => ID)
  id: string;

  @Field(() => Float)
  quantity: number;

  // Relations
  @Field(() => ShoppingCartType)
  shoppingCart: ShoppingCartType;

  @Field(() => ProductItemType)
  productItem: ProductItemType;
}
