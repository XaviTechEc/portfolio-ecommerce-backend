import { Field, ObjectType } from '@nestjs/graphql';
import { ProductType } from '../products/product.type';
import { CategoryType } from '../categories/category.type';

@ObjectType()
export class ProductCategoryType {
  // Relations
  @Field(() => ProductType)
  product: ProductType;

  @Field(() => CategoryType)
  category: CategoryType;
}
