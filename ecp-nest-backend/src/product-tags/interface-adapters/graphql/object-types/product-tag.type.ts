import { Field, ObjectType } from '@nestjs/graphql';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { ProductType } from 'src/products/interface-adapters/graphql/object-types/product.type';
import { TagType } from 'src/tags/interface-adapters/graphql/object-types/tag.type';

@ObjectType()
export class ProductTagType extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  // Relations
  @Field(() => ProductType)
  product: ProductType;

  @Field(() => TagType)
  tag: TagType;
}
