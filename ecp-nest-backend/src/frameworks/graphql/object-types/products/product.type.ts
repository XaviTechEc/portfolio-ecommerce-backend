import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserObjType } from '../users/user.type';

@ObjectType()
export class ProductType {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  subtitle: string;

  @Field(() => String)
  description: string;

  @Field(() => UserObjType)
  createdBy: UserObjType;

  @Field(() => UserObjType, { nullable: true })
  updatedBy?: UserObjType;

  @Field(() => String, { nullable: true })
  imgUrl?: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt?: Date;
}
