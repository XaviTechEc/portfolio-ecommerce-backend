import { Field, ID, ObjectType } from '@nestjs/graphql';
import { SeasonType } from '../seasons/season.type';

@ObjectType()
export class CategoryType {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  value: string;

  @Field(() => String)
  description: string;

  @Field(() => SeasonType)
  season: SeasonType;

  @Field(() => CategoryType, { nullable: true })
  parentCategory?: CategoryType;

  @Field(() => Boolean, { nullable: true })
  active?: boolean;

  @Field(() => String)
  createdBy: string;
}
