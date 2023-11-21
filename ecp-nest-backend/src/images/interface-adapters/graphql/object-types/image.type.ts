import { ObjectType, Field, ID } from '@nestjs/graphql';
import { BillboardType } from 'src/billboard/interface-adapters/graphql/object-types/billboard.type';
import { CategoryType } from 'src/categories/interface-adapters/graphql/object-types/category.type';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { ProductItemType } from 'src/product-items/interface-adapters/graphql/object-types/product-item.type';
import { ProductType } from 'src/products/interface-adapters/graphql/object-types/product.type';
import { UserObjType } from 'src/users/interface-adapters/graphql/object-types/user.type';

@ObjectType()
export class ImageType extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  url: string;

  @Field(() => String)
  extension: string;

  @Field(() => ProductType, { nullable: true })
  product?: ProductType;

  @Field(() => ProductItemType, { nullable: true })
  productItem?: ProductItemType;

  @Field(() => CategoryType, { nullable: true })
  category?: CategoryType;

  @Field(() => BillboardType)
  billboard: BillboardType;
}
