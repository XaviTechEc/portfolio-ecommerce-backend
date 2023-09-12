import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ImageType } from 'src/images/domain/object-types/image.type';
import { ProductCategoryType } from 'src/product-categories/domain/object-types/product-category.type';
import { ProductItemType } from 'src/product-items/domain/object-types/product-item.type';
import { UserObjType } from 'src/users/domain/object-types/user.type';

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
