import { Field } from '@nestjs/graphql';
import { ProductType } from '../products/product.type';
import { CategoryType } from '../categories/category.type';

export class ProductCategoryType {
  @Field(() => ProductType)
  product: ProductType;

  @Field(() => CategoryType)
  category: CategoryType;
}
