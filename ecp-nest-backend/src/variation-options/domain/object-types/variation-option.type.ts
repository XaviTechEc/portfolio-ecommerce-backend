import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ProductConfigurationType } from 'src/product-configurations/domain/object-types/product-configuration.type';
import { VariationType } from 'src/variations/domain/object-types/variation.entity.type';

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
