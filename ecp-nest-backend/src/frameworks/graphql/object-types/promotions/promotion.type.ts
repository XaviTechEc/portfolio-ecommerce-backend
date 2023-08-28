import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PromotionType {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  description: string;

  @Field(() => Int, { nullable: true })
  percentageDiscount?: number;

  @Field(() => Date, { nullable: true })
  startDate?: Date;

  @Field(() => Date, { nullable: true })
  endDate?: Date;
}
