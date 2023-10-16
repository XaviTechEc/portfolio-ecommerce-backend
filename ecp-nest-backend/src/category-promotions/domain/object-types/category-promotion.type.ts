import { ObjectType, Field } from '@nestjs/graphql';
import { CategoryType } from 'src/categories/domain/object-types/category.type';
import { PromotionType } from 'src/promotions/domain/object-types/promotion.type';

@ObjectType()
export class CategoryPromotionType {
  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  // Relations
  @Field(() => CategoryType)
  category: CategoryType;

  @Field(() => PromotionType)
  promotion: PromotionType;
}
