import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { CategoryPromotionType } from 'src/category-promotions/interface-adapters/graphql/object-types/category-promotion.type';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { ProductPromotionType } from 'src/product-promotions/interface-adapters/graphql/object-types/product-promotion.type';

@ObjectType()
export class PromotionType extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
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
