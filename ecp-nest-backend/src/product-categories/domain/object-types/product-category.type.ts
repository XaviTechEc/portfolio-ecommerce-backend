import { ObjectType, Field } from '@nestjs/graphql';
import { CategoryType } from 'src/categories/domain/object-types/category.type';
import { ProductType } from 'src/products/domain/object-types/product.type';

@ObjectType()
export class ProductCategoryType {
  // Relations
  @Field(() => ProductType)
  product: ProductType;

  @Field(() => CategoryType)
  category: CategoryType;
}
