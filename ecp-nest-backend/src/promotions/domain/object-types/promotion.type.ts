import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { CategoryPromotionType } from 'src/category-promotions/domain/object-types/category-promotion.type';
import { ProductPromotionType } from 'src/product-promotions/domain/object-types/product-promotion.type';

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

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  // Relations
  @Field(() => [ProductPromotionType])
  productPromotions: ProductPromotionType[];

  @Field(() => [CategoryPromotionType])
  categoryPromotions: CategoryPromotionType[];
}
