import { Field, ObjectType } from '@nestjs/graphql';
import { CategoryType } from '../categories/category.type';
import { PromotionType } from '../promotions/promotion.type';

@ObjectType()
export class CategoryPromotionType {
  // Relations
  @Field(() => CategoryType)
  category: CategoryType;

  @Field(() => PromotionType)
  promotion: PromotionType;
}
