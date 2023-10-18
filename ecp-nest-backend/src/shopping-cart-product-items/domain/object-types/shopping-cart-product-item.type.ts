import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { ProductItemType } from 'src/product-items/domain/object-types/product-item.type';
import { ShoppingCartType } from 'src/shopping-carts/domain/object-types/shopping-cart.type';

@ObjectType()
export class ShoppingCartProductItemType {
  @Field(() => ID)
  id: string;

  @Field(() => Float)
  quantity: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  // Relations
  @Field(() => ShoppingCartType)
  shoppingCart: ShoppingCartType;

  @Field(() => ProductItemType)
  productItem: ProductItemType;
}
