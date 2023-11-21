import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { ShopOrderType } from 'src/shop-orders/interface-adapters/graphql/object-types/shop-order.type';
import { UserAddressType } from 'src/user-addresses/interface-adapters/graphql/object-types/user-address.type';
import { CountryType } from './country.type';
import { LocationType } from './location.type';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';

@ObjectType()
export class AddressType extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  @Field(() => ID)
  id: string;

  @Field(() => Int, { nullable: true })
  unitNumber?: number;

  @Field(() => String, { nullable: true })
  streetNumber?: string;

  @Field(() => String)
  addressLine1: string;

  @Field(() => String, { nullable: true })
  addressLine2?: string;

  @Field(() => String)
  city: string;

  @Field(() => String, { nullable: true })
  region?: string;

  @Field(() => String)
  postalCode: string;

  @Field(() => String, { nullable: true })
  reference?: string;

  // Relations
  @Field(() => CountryType)
  country: CountryType;

  @Field(() => LocationType, { nullable: true })
  location?: LocationType;

  @Field(() => [UserAddressType])
  userAddresses: UserAddressType[];

  @Field(() => [ShopOrderType])
  shopOrders: ShopOrderType[];
}
