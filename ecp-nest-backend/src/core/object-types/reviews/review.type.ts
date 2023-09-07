import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { UserObjType } from '../users/user.type';
import { OrderLineType } from '../cart/order-line.type';
import { CommentType } from '../comments/comment.type';

@ObjectType()
export class ReviewType {
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  ratingValue: number;

  @Field(() => String, { nullable: true })
  content?: string;

  @Field(() => Boolean, { nullable: true })
  visible?: boolean;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  // Relations;
  @Field(() => UserObjType)
  user: UserObjType;

  @Field(() => OrderLineType)
  orderLine: OrderLineType;

  @Field(() => [CommentType])
  comments: CommentType[];
}
