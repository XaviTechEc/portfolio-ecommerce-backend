import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserObjType } from 'src/users/domain/object-types/user.type';

@ObjectType()
export class StoreType {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String)
  slug: string;

  @Field(() => UserObjType)
  user: UserObjType;
}
