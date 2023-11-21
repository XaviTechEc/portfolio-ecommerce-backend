import { Field, ObjectType } from '@nestjs/graphql';
import { CategoryType } from 'src/categories/interface-adapters/graphql/object-types/category.type';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';

import { PromotionType } from 'src/promotions/interface-adapters/graphql/object-types/promotion.type';

@ObjectType()
export class CategoryPromotionType extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  // Relations
  @Field(() => CategoryType)
  category: CategoryType;

  @Field(() => PromotionType)
  promotion: PromotionType;
}
