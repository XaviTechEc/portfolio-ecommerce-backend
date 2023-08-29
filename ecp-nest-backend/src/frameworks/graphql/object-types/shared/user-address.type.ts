import { Field } from '@nestjs/graphql';
import { UserObjType } from '../users/user.type';
import { AddressType } from '../addresses/address.type';

export class UserAddressType {
  @Field(() => Boolean, { nullable: true })
  isDefault?: boolean;

  // Relations
  @Field(() => UserObjType)
  user: UserObjType;

  @Field(() => AddressType)
  address: AddressType;
}
