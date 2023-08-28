import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CountryType {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  code: string;

  @Field(() => String)
  longName: string;
}
