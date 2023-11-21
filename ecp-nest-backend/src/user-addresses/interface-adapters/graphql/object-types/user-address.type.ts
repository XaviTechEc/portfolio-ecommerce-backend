import { Field, ObjectType } from '@nestjs/graphql';
import { AddressType } from 'src/addresses/interface-adapters/graphql/object-types/address.type';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { UserObjType } from 'src/users/interface-adapters/graphql/object-types/user.type';

@ObjectType()
export class UserAddressType extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  @Field(() => Boolean, { nullable: true })
  isDefault?: boolean;

  // Relations
  @Field(() => UserObjType)
  user: UserObjType;

  @Field(() => AddressType)
  address: AddressType;
}
