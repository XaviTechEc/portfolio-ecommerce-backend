import { ObjectType, Field, ID } from '@nestjs/graphql';
import { AddressType } from './address.type';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';

@ObjectType()
export class CountryType extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
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
