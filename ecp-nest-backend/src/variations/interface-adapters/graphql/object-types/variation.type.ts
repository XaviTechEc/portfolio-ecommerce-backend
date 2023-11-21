import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CategoryType } from 'src/categories/interface-adapters/graphql/object-types/category.type';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { VariationOptionType } from 'src/variation-options/interface-adapters/graphql/object-types/variation-option.type';

@ObjectType()
export class VariationType extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
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
