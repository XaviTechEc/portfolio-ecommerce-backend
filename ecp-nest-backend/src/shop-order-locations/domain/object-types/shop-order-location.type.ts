import { ObjectType, Field } from '@nestjs/graphql';
import { LocationType } from 'src/addresses/domain/object-types/location.type';
import { ShopOrderType } from 'src/shop-orders/domain/object-types/shop-order.type';

@ObjectType()
export class ShopOrderLocationType {
  @Field(() => ShopOrderType)
  shopOrder: ShopOrderType;

  @Field(() => LocationType)
  location: LocationType;
}
