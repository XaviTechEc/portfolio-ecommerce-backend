import { Field, ID } from '@nestjs/graphql';
import { CategoryType } from '../categories/category.type';

export class VariationType {
  @Field(() => ID)
  id: string;

  @Field(() => CategoryType)
  category: CategoryType;

  @Field(() => String)
  name: string;
}
