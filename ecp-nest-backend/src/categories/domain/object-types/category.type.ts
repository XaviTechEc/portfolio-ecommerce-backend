import { Field, ID, ObjectType } from '@nestjs/graphql';
import { SeasonType } from '../seasons/season.type';
import { UserObjType } from '../users/user.type';
import { VariationType } from '../variations/variation.entity.type';
import { ImageType } from '../images/image.type';
// import { ProductCategoryType } from '../shared/product-category.type';
// import { CategoryPromotionType } from '../shared/category-promotion.type';

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
  @Field(() => UserObjType)
  createdBy: UserObjType;

  @Field(() => [CategoryType], { nullable: true })
  categories?: CategoryType[];

  @Field(() => CategoryType, { nullable: true })
  parentCategory?: CategoryType;

  @Field(() => [VariationType])
  variations: VariationType[];

  @Field(() => SeasonType)
  season: SeasonType;

  @Field(() => [ImageType])
  images: ImageType[];

  //? Unnecessary field - query in parent
  // @Field(() => [ProductCategoryType])
  // productCategories: ProductCategoryType[];

  //? Unnecessary field - query in parent
  // @Field(() => [CategoryPromotionType])
  // categoryPromotions?: CategoryPromotionType[];
}
