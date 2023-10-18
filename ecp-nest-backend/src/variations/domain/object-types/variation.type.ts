import { ObjectType, Field, ID } from '@nestjs/graphql';
import { CategoryType } from 'src/categories/domain/object-types/category.type';
import { VariationOptionType } from 'src/variation-options/domain/object-types/variation-option.type';

@ObjectType()
export class VariationType {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  // Relations
  @Field(() => [VariationOptionType])
  variationOptions: VariationOptionType[];

  @Field(() => CategoryType)
  category: CategoryType;
}
