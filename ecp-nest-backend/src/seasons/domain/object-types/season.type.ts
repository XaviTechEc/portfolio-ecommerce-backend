import { Field, ObjectType } from '@nestjs/graphql';
import { CategoryType } from '../categories/category.type';

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
}
