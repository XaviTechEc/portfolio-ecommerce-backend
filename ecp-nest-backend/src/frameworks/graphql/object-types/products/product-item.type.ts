import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { ProductType } from './product.type';

@ObjectType()
export class ProductItemType {
  @Field(() => ID)
  id: string;

  @Field(() => ProductType)
  product: ProductType;

  @Field(() => String)
  sku: string;

  @Field(() => Float, { nullable: true })
  quantityInStock?: number;

  @Field(() => Float, { nullable: true })
  price?: number;

  @Field(() => String, { nullable: true })
  imgUrl?: string;

  @Field(() => String)
  slug: string;
}
