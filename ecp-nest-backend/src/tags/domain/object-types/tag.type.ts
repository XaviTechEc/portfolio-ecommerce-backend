import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ProductTagType } from 'src/product-tags/domain/object-types/product-tag.type';

@ObjectType()
export class TagType {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  code: string;

  @Field(() => String)
  value: string;

  // Relations
  @Field(() => [ProductTagType])
  productTags: ProductTagType[];
}
