import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserObjType } from '../users/user.type';
import { ReviewType } from '../reviews/review.type';

@ObjectType()
export class CommentType {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  content: string;

  @Field(() => Boolean, { nullable: true, defaultValue: true })
  visible?: boolean;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  // Relations
  @Field(() => ReviewType)
  review: ReviewType;

  @Field(() => UserObjType)
  user: UserObjType;

  @Field(() => [CommentType], { nullable: true })
  comments: CommentType[];

  @Field(() => CommentType)
  commentParent?: CommentType;
}
