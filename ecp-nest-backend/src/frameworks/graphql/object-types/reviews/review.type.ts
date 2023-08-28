import { Field, ID, Int } from '@nestjs/graphql';
import { UserObjType } from '../users/user.type';
import { OrderLineType } from '../cart/order-line.type';

export class ReviewType {
  @Field(() => ID)
  id: string;

  @Field(() => UserObjType)
  user: UserObjType;

  @Field(() => OrderLineType)
  orderedProduct: OrderLineType;

  @Field(() => Int)
  ratingValue: number;

  @Field(() => Boolean, { nullable: true })
  visible?: boolean;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}
