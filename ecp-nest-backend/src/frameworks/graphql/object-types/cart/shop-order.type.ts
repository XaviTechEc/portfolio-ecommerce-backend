import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { UserObjType } from '../users/user.type';
import { LocationType } from '../addresses/location.type';
import { UserPaymentMethodType } from '../shared/user-payment-method.entity.type';
import { AddressType } from '../addresses/address.type';
import { ShippingMethodType } from './shipping-method.type';
import { OrderStatusType } from './order-status.type';

@ObjectType()
export class ShopOrderType {
  @Field(() => ID)
  id: string;

  @Field(() => UserObjType)
  user: UserObjType;

  @Field(() => UserPaymentMethodType)
  userPaymentMethod: UserPaymentMethodType;

  @Field(() => AddressType)
  shoppingAddress: AddressType;

  @Field(() => ShippingMethodType)
  shippingMethod: ShippingMethodType;

  @Field(() => Float)
  orderTotal: number;

  @Field(() => OrderStatusType)
  orderStatus: OrderStatusType;

  @Field(() => LocationType, { nullable: true })
  lastLocationId?: LocationType;
}
