import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ShopOrderType } from 'src/shop-orders/domain/object-types/shop-order.type';
import { StatusValue } from '../enums/status-value.enum';

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
