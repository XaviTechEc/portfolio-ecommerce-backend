import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AddressType } from './address.type';

@ObjectType()
export class CountryType {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  code: string;

  @Field(() => String)
  longName: string;

  // Relations
  @Field(() => [AddressType])
  addresses: AddressType[];
}
