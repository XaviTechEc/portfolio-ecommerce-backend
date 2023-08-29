import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { UserObjType } from '../users/user.type';
import { LocationType } from '../addresses/location.type';
import { UserPaymentMethodType } from '../shared/user-payment-method.entity.type';
import { AddressType } from '../addresses/address.type';
import { ShippingMethodType } from './shipping-method.type';
import { OrderStatusType } from './order-status.type';
import { OrderLineType } from './order-line.type';

@ObjectType()
export class ShopOrderType {
  @Field(() => ID)
  id: string;

  @Field(() => Float)
  orderTotal: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  // Relations
  @Field(() => [OrderLineType])
  orderLines: OrderLineType[];

  @Field(() => ShippingMethodType)
  shippingMethod: ShippingMethodType;

  @Field(() => OrderStatusType)
  orderStatus: OrderStatusType;

  @Field(() => [LocationType], { nullable: true })
  lastLocations?: LocationType[];

  @Field(() => UserObjType)
  user: UserObjType;

  @Field(() => UserPaymentMethodType)
  userPaymentMethod: UserPaymentMethodType;

  @Field(() => AddressType)
  shippingAddress: AddressType;
}
