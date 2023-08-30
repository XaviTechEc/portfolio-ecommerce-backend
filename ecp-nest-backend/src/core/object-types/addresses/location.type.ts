import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AddressType } from './address.type';
import { ShopOrderType } from '../cart/shop-order.type';

@ObjectType()
export class LocationType {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  lat: number;

  @Field(() => String)
  lng: number;

  // Relations
  @Field(() => AddressType)
  address: AddressType;

  @Field(() => ShopOrderType)
  shopOrder: ShopOrderType;
}
