import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserObjType } from '../users/user.type';
import { ReviewType } from '../reviews/review.type';

@ObjectType()
export class CommentType {
  @Field(() => ID)
  id: string;

  @Field(() => UserObjType)
  user: UserObjType;

  @Field(() => String)
  content: string;

  @Field(() => Boolean, { nullable: true })
  visible?: boolean;

  @Field(() => ReviewType)
  review: ReviewType;

  @Field(() => CommentType)
  commentParent: CommentType;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}
