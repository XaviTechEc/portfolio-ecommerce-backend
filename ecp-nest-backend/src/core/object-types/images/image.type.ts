import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CategoryType } from '../categories/category.type';
import { ProductItemType } from '../products/product-item.type';
import { ProductType } from '../products/product.type';
import { UserObjType } from '../users/user.type';

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
}
