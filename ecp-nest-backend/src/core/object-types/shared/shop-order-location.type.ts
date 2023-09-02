import { Field, ObjectType } from '@nestjs/graphql';
import { ShopOrderType } from '../cart/shop-order.type';
import { LocationType } from '../addresses/location.type';

@ObjectType()
export class ShopOrderLocationType {
  @Field(() => ShopOrderType)
  shopOrder: ShopOrderType;

  @Field(() => LocationType)
  location: LocationType;
}
