import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { ProductItemType } from '../products/product-item.type';
import { ShopOrderType } from './shop-order.type';

@ObjectType()
export class OrderLineType {
  @Field(() => ID)
  id: string;

  @Field(() => ProductItemType)
  productItem: ProductItemType;

  @Field(() => ShopOrderType)
  shopOrder: ShopOrderType;

  @Field(() => Float)
  quantity: number;

  @Field(() => Float)
  totalPrice: number;
}
