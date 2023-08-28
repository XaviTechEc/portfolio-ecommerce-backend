import { Field } from '@nestjs/graphql';
import { ProductType } from '../products/product.type';
import { TagType } from '../tags/tag.type';

export class ProductTagType {
  @Field(() => ProductType)
  product: ProductType;

  @Field(() => TagType)
  tag: TagType;
}
