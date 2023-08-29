import { Field, ObjectType } from '@nestjs/graphql';
import { ProductItemType } from '../products/product-item.type';
import { VariationOptionType } from '../variations/variation-option.type';

@ObjectType()
export class ProductConfigurationType {
  @Field(() => ProductItemType)
  productItem: ProductItemType;

  @Field(() => VariationOptionType)
  variationOption: VariationOptionType;
}
