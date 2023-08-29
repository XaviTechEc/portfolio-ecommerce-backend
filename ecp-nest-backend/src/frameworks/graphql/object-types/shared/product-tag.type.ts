import { Field, ObjectType } from '@nestjs/graphql';
import { ProductType } from '../products/product.type';
import { TagType } from '../tags/tag.type';

@ObjectType()
export class ProductTagType {
  @Field(() => ProductType)
  product: ProductType;

  @Field(() => TagType)
  tag: TagType;
}
