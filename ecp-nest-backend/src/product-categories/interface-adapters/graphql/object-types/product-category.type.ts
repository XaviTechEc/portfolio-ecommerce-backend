import { Field, ObjectType } from '@nestjs/graphql';
import { CategoryType } from 'src/categories/interface-adapters/graphql/object-types/category.type';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { ProductType } from 'src/products/interface-adapters/graphql/object-types/product.type';

@ObjectType()
export class ProductCategoryType extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  // Relations
  @Field(() => ProductType)
  product: ProductType;

  @Field(() => CategoryType)
  category: CategoryType;
}
