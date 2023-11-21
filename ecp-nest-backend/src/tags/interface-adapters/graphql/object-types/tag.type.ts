import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { ProductTagType } from 'src/product-tags/interface-adapters/graphql/object-types/product-tag.type';

@ObjectType()
export class TagType extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
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
