import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { CountryType } from './country.type';
import { LocationType } from './location.type';
import { UserAddressType } from '../shared/user-address.type';
import { ShopOrderType } from '../cart/shop-order.type';

@ObjectType()
export class AddressType {
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
