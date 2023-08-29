import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CategoryType } from '../categories/category.type';
import { VariationOptionType } from './variation-option.type';

@ObjectType()
export class VariationType {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  // Relations
  @Field(() => [VariationOptionType])
  variationOptions: VariationOptionType[];

  @Field(() => CategoryType)
  category: CategoryType;
}
