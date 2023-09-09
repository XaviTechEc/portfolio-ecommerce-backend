import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { ProductPromotionType } from '../shared/product-promotion.type';
import { CategoryPromotionType } from '../shared/category-promotion.type';

@ObjectType()
export class PromotionType {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  description: string;

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  percentageDiscount?: number;

  @Field(() => Date, { nullable: true })
  startDate?: Date;

  @Field(() => Date, { nullable: true })
  endDate?: Date;

  // Relations
  @Field(() => [ProductPromotionType])
  productPromotions: ProductPromotionType[];

  @Field(() => [CategoryPromotionType])
  categoryPromotions: CategoryPromotionType[];
}
