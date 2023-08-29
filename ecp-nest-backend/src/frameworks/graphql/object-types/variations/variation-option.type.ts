import { Field, ID, ObjectType } from '@nestjs/graphql';
import { VariationType } from './variation.entity.type';
import { ProductConfigurationType } from '../shared/product-configuration.type';

@ObjectType()
export class VariationOptionType {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  value: string;

  // Relations
  @Field(() => [ProductConfigurationType])
  productConfigurations: ProductConfigurationType[];

  @Field(() => VariationType)
  variation: VariationType;
}
