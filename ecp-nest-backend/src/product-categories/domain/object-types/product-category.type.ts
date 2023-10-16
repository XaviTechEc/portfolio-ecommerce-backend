import { ObjectType, Field } from '@nestjs/graphql';
import { CategoryType } from 'src/categories/domain/object-types/category.type';
import { ProductType } from 'src/products/domain/object-types/product.type';

@ObjectType()
export class ProductCategoryType {
  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  // Relations
  @Field(() => ProductType)
  product: ProductType;

  @Field(() => CategoryType)
  category: CategoryType;
}
