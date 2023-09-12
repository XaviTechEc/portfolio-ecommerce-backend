import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { CommentType } from 'src/comments/domain/object-types/comment.type';
import { OrderLineType } from 'src/order-lines/domain/object-types/order-line.type';
import { UserObjType } from 'src/users/domain/object-types/user.type';

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
