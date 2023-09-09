import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserObjType } from '../users/user.type';
import { ProductCategoryType } from '../shared/product-category.type';
import { ProductItemType } from './product-item.type';
import { ImageType } from '../images/image.type';
// import { ProductTagType } from '../shared/product-tag.type';
// import { ProductPromotionType } from '../shared/product-promotion.type';

@ObjectType()
export class ProductType {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  subtitle: string;

  @Field(() => String)
  description: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  // Relations
  @Field(() => [ProductCategoryType])
  productCategories: ProductCategoryType[];

  @Field(() => UserObjType)
  createdBy: UserObjType;

  @Field(() => [ProductItemType])
  productItems: ProductItemType[];

  @Field(() => [ImageType])
  images: ImageType[];

  //? Unnecessary field - query in parent
  // @Field(() => [ProductTagType])
  // productTags: ProductTagType[];

  //? Unnecessary field - query in parent
  // @Field(() => [ProductPromotionType])
  // productPromotions: ProductPromotionType[];
}
