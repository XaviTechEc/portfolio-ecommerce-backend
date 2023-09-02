import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { ShopOrderType } from './shop-order.type';

@ObjectType()
export class ShippingMethodType {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Float, { defaultValue: 0 })
  price: number;

  // Relations
  @Field(() => [ShopOrderType])
  shopOrders: ShopOrderType[];
}
