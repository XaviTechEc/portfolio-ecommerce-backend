import { Field, ObjectType } from '@nestjs/graphql';
import { LocationType } from 'src/addresses/interface-adapters/graphql/object-types/location.type';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { ShopOrderType } from 'src/shop-orders/interface-adapters/graphql/object-types/shop-order.type';

@ObjectType()
export class ShopOrderLocationType extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  // Locations
  @Field(() => ShopOrderType)
  shopOrder: ShopOrderType;

  @Field(() => LocationType)
  location: LocationType;
}
