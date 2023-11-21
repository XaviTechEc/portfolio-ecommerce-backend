import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { IImage } from 'src/images/domain/entities/image.entity';
import { ImageType } from 'src/images/interface-adapters/graphql/object-types/image.type';
import { ISeason } from 'src/seasons/domain/entities/season.entity';
import { SeasonType } from 'src/seasons/interface-adapters/graphql/object-types/season.type';
import { IStore } from 'src/stores/domain/entities/store.entity';
import { Store } from 'src/stores/infrastructure/data/postgresql/entities/Store.entity';
import { IVariation } from 'src/variations/domain/entities/variation.entity';
import { VariationType } from 'src/variations/interface-adapters/graphql/object-types/variation.type';
import { ICategory } from '../../../domain/entities/category.entity';

@ObjectType()
export class CategoryType extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  // Relations
  //? Unnecessary field - query in parent
  // @Field(() => [ProductCategoryType])
  // productCategories: ProductCategoryType[];

  @Field(() => [CategoryType], { nullable: true })
  categories?: ICategory[];

  @Field(() => CategoryType, { nullable: true })
  parentCategory?: ICategory;

  //? Unnecessary field - query in parent
  // @Field(() => [CategoryPromotionType])
  // categoryPromotions?: CategoryPromotionType[];

  @Field(() => [VariationType])
  variations: IVariation[];

  @Field(() => SeasonType)
  season: ISeason;

  @Field(() => [ImageType])
  images: IImage[];

  @Field(() => Store)
  store: IStore;
}
