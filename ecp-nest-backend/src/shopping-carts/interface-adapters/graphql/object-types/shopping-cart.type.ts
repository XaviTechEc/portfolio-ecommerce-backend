import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { UserObjType } from 'src/users/interface-adapters/graphql/object-types/user.type';

@ObjectType()
export class ShoppingCartType extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  @Field(() => ID)
  id: string;

  // Relations
  @Field(() => UserObjType)
  user: UserObjType;

  //? Unnecessary field - query in parent
  // @Field(() => [ShoppingCartProductItemType])
  // shoppingCartProductItems: ShoppingCartProductItemType[];
}
