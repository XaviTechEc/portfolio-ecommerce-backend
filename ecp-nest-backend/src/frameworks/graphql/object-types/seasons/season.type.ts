import { Field } from '@nestjs/graphql';

export class SeasonType {
  @Field(() => String)
  id: string;

  @Field(() => String)
  description: string;

  @Field(() => Date, { nullable: true })
  startDate?: Date;

  @Field(() => Date, { nullable: true })
  endDate?: Date;
}
