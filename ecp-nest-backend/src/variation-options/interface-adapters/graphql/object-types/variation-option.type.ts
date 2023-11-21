import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { ProductConfigurationType } from 'src/product-configurations/interface-adapters/graphql/object-types/product-configuration.type';
import { VariationType } from 'src/variations/interface-adapters/graphql/object-types/variation.type';

@ObjectType()
export class VariationOptionType extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
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
