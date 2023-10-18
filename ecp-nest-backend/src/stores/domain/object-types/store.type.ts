import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserObjType } from 'src/users/domain/object-types/user.type';

@ObjectType()
export class StoreType {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String)
  slug: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  // Relations

  @Field(() => UserObjType)
  user: UserObjType;
}
