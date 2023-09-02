import { Field, ID, ObjectType } from '@nestjs/graphql';
import { SeasonType } from '../seasons/season.type';
import { ProductCategoryType } from '../shared/product-category.type';
import { UserObjType } from '../users/user.type';
import { CategoryPromotionType } from '../shared/category-promotion.type';
import { VariationType } from '../variations/variation.entity.type';
import { ImageType } from '../images/image.type';

@ObjectType()
export class CategoryType {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  value: string;

  @Field(() => String)
  description: string;

  @Field(() => Boolean, { nullable: true })
  active?: boolean;

  // Relations
  @Field(() => [ProductCategoryType])
  productCategories: ProductCategoryType[];

  @Field(() => UserObjType)
  createdBy: UserObjType;

  @Field(() => [CategoryType], { nullable: true })
  categories?: CategoryType[];

  @Field(() => CategoryType, { nullable: true })
  parentCategory?: CategoryType;

  @Field(() => [CategoryPromotionType])
  categoryPromotions?: CategoryPromotionType[];

  @Field(() => [VariationType])
  variations: VariationType[];

  @Field(() => SeasonType)
  season: SeasonType;

  @Field(() => [ImageType])
  images: ImageType[];
}
