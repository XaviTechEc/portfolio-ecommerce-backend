import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { ReviewType } from 'src/reviews/interface-adapters/graphql/object-types/review.type';
import { UserObjType } from 'src/users/interface-adapters/graphql/object-types/user.type';

@ObjectType()
export class CommentType extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  content: string;

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
