import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ProductConfigurationType } from 'src/product-configurations/domain/object-types/product-configuration.type';
import { VariationType } from 'src/variations/domain/object-types/variation.type';

@ObjectType()
export class VariationOptionType {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  value: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  // Relations
  @Field(() => [ProductConfigurationType])
  productConfigurations: ProductConfigurationType[];

  @Field(() => VariationType)
  variation: VariationType;
}
