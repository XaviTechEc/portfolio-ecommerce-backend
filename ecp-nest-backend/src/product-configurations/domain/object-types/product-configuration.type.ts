import { ObjectType, Field } from '@nestjs/graphql';
import { ProductItemType } from 'src/product-items/domain/object-types/product-item.type';
import { VariationOptionType } from 'src/variation-options/domain/object-types/variation-option.type';

@ObjectType()
export class ProductConfigurationType {
  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  // Relations
  @Field(() => ProductItemType)
  productItem: ProductItemType;

  @Field(() => VariationOptionType)
  variationOption: VariationOptionType;
}
