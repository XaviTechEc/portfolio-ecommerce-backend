import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ShopOrderLocationType } from 'src/shop-order-locations/domain/object-types/shop-order-location.type';
import { AddressType } from './address.type';

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

  @Field(() => [ShopOrderLocationType])
  shopOrderLocations: ShopOrderLocationType[];
}
