import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AddressType } from './address.type';
import { ShopOrderLocation } from '../shared/shop-order-location.type';

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

  @Field(() => [ShopOrderLocation])
  shopOrderLocations: ShopOrderLocation[];
}
