import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { AddressType } from 'src/addresses/domain/object-types/address.type';
import { OrderLineType } from 'src/order-lines/domain/object-types/order-line.type';
import { OrderStatusType } from 'src/order-status/domain/object-types/order-status.type';
import { ShippingMethodType } from 'src/shipping-methods/domain/object-types/shipping-method.type';
import { UserPaymentMethodType } from 'src/user-payment-methods/domain/object-types/user-payment-method.entity.type';
import { UserObjType } from 'src/users/domain/object-types/user.type';

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

  @Field(() => UserObjType)
  user: UserObjType;

  @Field(() => UserPaymentMethodType)
  userPaymentMethod: UserPaymentMethodType;

  @Field(() => AddressType)
  shippingAddress: AddressType;

  //? Unnecessary field - query in parent
  // @Field(() => [ShopOrderLocationType])
  // shopOrderLocations: ShopOrderLocationType[];
}
