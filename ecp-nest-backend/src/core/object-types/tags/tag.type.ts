import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ProductTagType } from '../shared/product-tag.type';

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
