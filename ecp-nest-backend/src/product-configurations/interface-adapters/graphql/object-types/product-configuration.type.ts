import { Field, ObjectType } from '@nestjs/graphql';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { ProductItemType } from 'src/product-items/interface-adapters/graphql/object-types/product-item.type';
import { VariationOptionType } from 'src/variation-options/interface-adapters/graphql/object-types/variation-option.type';

@ObjectType()
export class ProductConfigurationType extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  // Relations
  @Field(() => ProductItemType)
  productItem: ProductItemType;

  @Field(() => VariationOptionType)
  variationOption: VariationOptionType;
}
