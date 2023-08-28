import { Field } from '@nestjs/graphql';
import { ProductItemType } from '../products/product-item.type';
import { VariationOptionType } from '../variations/variation-option.type';

export class ProductConfigurationType {
  @Field(() => ProductItemType)
  productItem: ProductItemType;

  @Field(() => VariationOptionType)
  variationOption: VariationOptionType;
}
