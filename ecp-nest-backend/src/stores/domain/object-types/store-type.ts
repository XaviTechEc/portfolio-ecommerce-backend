import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BillboardType } from 'src/billboard/domain/object-types/billboard.type';
import { CategoryType } from 'src/categories/domain/object-types/category.type';
import { UserObjType } from 'src/users/domain/object-types/user.type';

@ObjectType()
export class StoreType {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String)
  slug: string;

  // Relations
  @Field(() => [BillboardType])
  billboards: BillboardType[];

  @Field(() => [CategoryType])
  categories: CategoryType[];

  @Field(() => UserObjType)
  user: UserObjType;
}
