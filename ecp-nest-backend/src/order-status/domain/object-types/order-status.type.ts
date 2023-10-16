import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ShopOrderType } from 'src/shop-orders/domain/object-types/shop-order.type';
import { StatusValue } from '../enums/status-value.enum';

@ObjectType()
export class OrderStatusType {
  @Field(() => ID)
  id: string;

  @Field(() => StatusValue)
  statusValue: StatusValue;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  // Relations
  @Field(() => [ShopOrderType])
  shopOrders: ShopOrderType[];
}
