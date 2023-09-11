import { ObjectType, Field } from '@nestjs/graphql';
import { ProductType } from 'src/products/domain/object-types/product.type';
import { TagType } from 'src/tags/domain/object-types/tag.type';

@ObjectType()
export class ProductTagType {
  @Field(() => ProductType)
  product: ProductType;

  @Field(() => TagType)
  tag: TagType;
}
