import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { AddressType } from 'src/addresses/interface-adapters/graphql/object-types/address.type';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { OrderLineType } from 'src/order-lines/interface-adapters/graphql/object-types/order-line.type';
import { OrderStatusType } from 'src/order-status/interface-adapters/graphql/object-types/order-status.type';
import { ShippingMethodType } from 'src/shipping-methods/interface-adapters/graphql/object-types/shipping-method.type';
import { UserPaymentMethodType } from 'src/user-payment-methods/interface-adapters/graphql/object-types/user-payment-method.entity.type';

@ObjectType()
export class ShopOrderType extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  @Field(() => ID)
  id: string;

  @Field(() => Float)
  orderTotal: number;

  // Relations
  @Field(() => [OrderLineType])
  orderLines: OrderLineType[];

  @Field(() => ShippingMethodType)
  shippingMethod: ShippingMethodType;

  @Field(() => OrderStatusType)
  orderStatus: OrderStatusType;

  @Field(() => UserPaymentMethodType)
  userPaymentMethod: UserPaymentMethodType;

  @Field(() => AddressType)
  shippingAddress: AddressType;

  //? Unnecessary field - query in parent
  // @Field(() => [ShopOrderLocationType])
  // shopOrderLocations: ShopOrderLocationType[];
}
