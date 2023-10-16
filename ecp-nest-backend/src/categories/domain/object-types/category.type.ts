import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ImageType } from 'src/images/domain/object-types/image.type';
import { SeasonType } from 'src/seasons/domain/object-types/season.type';
import { StoreType } from 'src/stores/domain/object-types/store.type';
import { UserObjType } from 'src/users/domain/object-types/user.type';
import { VariationType } from 'src/variations/domain/object-types/variation.type';

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

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

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

  @Field(() => StoreType)
  store: StoreType;

  //? Unnecessary field - query in parent
  // @Field(() => [ProductCategoryType])
  // productCategories: ProductCategoryType[];

  //? Unnecessary field - query in parent
  // @Field(() => [CategoryPromotionType])
  // categoryPromotions?: CategoryPromotionType[];
}
