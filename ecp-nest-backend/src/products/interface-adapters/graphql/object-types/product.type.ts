import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { ImageType } from 'src/images/interface-adapters/graphql/object-types/image.type';
import { ProductCategoryType } from 'src/product-categories/interface-adapters/graphql/object-types/product-category.type';
import { ProductItemType } from 'src/product-items/interface-adapters/graphql/object-types/product-item.type';

@ObjectType()
export class ProductType extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  subtitle: string;

  @Field(() => String)
  description: string;

  // Relations
  @Field(() => [ProductCategoryType])
  productCategories: ProductCategoryType[];

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
