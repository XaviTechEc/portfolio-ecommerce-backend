import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ReviewType } from 'src/reviews/domain/object-types/review.type';
import { UserObjType } from 'src/users/domain/object-types/user.type';

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
