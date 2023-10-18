import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { ShopOrderType } from 'src/shop-orders/domain/object-types/shop-order.type';

@ObjectType()
export class ShippingMethodType {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Float, { defaultValue: 0 })
  price: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  // Relations
  @Field(() => [ShopOrderType])
  shopOrders: ShopOrderType[];
}
