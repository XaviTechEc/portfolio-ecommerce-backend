import { ObjectType, Field, ID } from '@nestjs/graphql';
import { BillboardType } from 'src/billboard/domain/object-types/billboard.type';
import { CategoryType } from 'src/categories/domain/object-types/category.type';
import { ProductItemType } from 'src/product-items/domain/object-types/product-item.type';
import { ProductType } from 'src/products/domain/object-types/product.type';
import { UserObjType } from 'src/users/domain/object-types/user.type';

@ObjectType()
export class ImageType {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  url: string;

  @Field(() => String)
  extension: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @Field(() => ProductType, { nullable: true })
  product?: ProductType;

  @Field(() => ProductItemType, { nullable: true })
  productItem?: ProductItemType;

  @Field(() => CategoryType, { nullable: true })
  category?: CategoryType;

  @Field(() => UserObjType)
  user: UserObjType;

  @Field(() => BillboardType)
  billboard: BillboardType;
}
