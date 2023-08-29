import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { ProductType } from './product.type';
import { ShoppingCartProductItemType } from '../shared/shopping-cart-product-item.type';
import { ProductConfigurationType } from '../shared/product-configuration.type';
import { OrderLineType } from '../cart/order-line.type';

@ObjectType()
export class ProductItemType {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  sku: string;

  @Field(() => Float, { nullable: true })
  quantityInStock?: number;

  @Field(() => Float, { nullable: true })
  price?: number;

  @Field(() => String, { nullable: true })
  imgUrl?: string;

  @Field(() => String)
  slug: string;

  // Relations
  @Field(() => [ShoppingCartProductItemType])
  shoppingCartProductItems: ShoppingCartProductItemType[];

  @Field(() => [OrderLineType])
  orderLines: OrderLineType[];

  @Field(() => ProductType)
  product: ProductType;

  @Field(() => [ProductConfigurationType])
  productConfigurations: ProductConfigurationType[];
}
