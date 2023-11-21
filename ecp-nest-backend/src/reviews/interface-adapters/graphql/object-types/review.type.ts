import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { CommentType } from 'src/comments/interface-adapters/graphql/object-types/comment.type';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { OrderLineType } from 'src/order-lines/interface-adapters/graphql/object-types/order-line.type';
import { UserObjType } from 'src/users/interface-adapters/graphql/object-types/user.type';

@ObjectType()
export class ReviewType extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  @Field(() => ID)
  id: string;

  @Field(() => Int)
  ratingValue: number;

  @Field(() => String, { nullable: true })
  content?: string;

  @Field(() => Boolean, { nullable: true })
  visible?: boolean;

  // Relations;
  @Field(() => UserObjType)
  user: UserObjType;

  @Field(() => OrderLineType)
  orderLine: OrderLineType;

  @Field(() => [CommentType])
  comments: CommentType[];
}
