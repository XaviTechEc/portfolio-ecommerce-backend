import { Field, ID, ObjectType } from '@nestjs/graphql';
import { StatusValue } from 'src/core/enums';
import { ShopOrderType } from './shop-order.type';

@ObjectType()
export class OrderStatusType {
  @Field(() => ID)
  id: string;

  @Field(() => StatusValue)
  statusValue: StatusValue;

  // Relations
  @Field(() => [ShopOrderType])
  shopOrders: ShopOrderType[];
}
