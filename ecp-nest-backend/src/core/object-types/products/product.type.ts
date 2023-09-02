import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserObjType } from '../users/user.type';
import { ProductCategoryType } from '../shared/product-category.type';
import { ProductPromotionType } from '../shared/product-promotion.type';
import { ProductItemType } from './product-item.type';
import { ProductTagType } from '../shared/product-tag.type';
import { ImageType } from '../images/image.type';

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

  @Field(() => [ProductTagType])
  productTags: ProductTagType[];

  @Field(() => [ProductPromotionType])
  productPromotions: ProductPromotionType[];

  @Field(() => [ProductItemType])
  productItems: ProductItemType[];

  @Field(() => [ImageType])
  images: ImageType[];
}
