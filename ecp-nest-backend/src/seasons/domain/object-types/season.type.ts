import { ObjectType, Field } from '@nestjs/graphql';
import { BillboardType } from 'src/billboard/domain/object-types/billboard.type';
import { CategoryType } from 'src/categories/domain/object-types/category.type';

@ObjectType()
export class SeasonType {
  @Field(() => String)
  id: string;

  @Field(() => String)
  description: string;

  @Field(() => Date, { nullable: true })
  startDate?: Date;

  @Field(() => Date, { nullable: true })
  endDate?: Date;

  // Relations
  @Field(() => CategoryType)
  categories: CategoryType[];

  @Field(() => [BillboardType])
  billboards: BillboardType[];
}
