import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ShopOrderLocationType } from 'src/shop-order-locations/interface-adapters/graphql/object-types/shop-order-location.type';
import { AddressType } from './address.type';
import { UserObjType } from 'src/users/interface-adapters/graphql/object-types/user.type';
import { IUser } from 'src/users/domain/entities/user.entity';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';

@ObjectType()
export class LocationType extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
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
