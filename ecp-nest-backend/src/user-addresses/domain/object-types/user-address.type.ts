import { ObjectType, Field } from '@nestjs/graphql';
import { AddressType } from 'src/addresses/domain/object-types/address.type';
import { UserObjType } from 'src/users/domain/object-types/user.type';

@ObjectType()
export class UserAddressType {
  @Field(() => Boolean, { nullable: true })
  isDefault?: boolean;

  // Relations
  @Field(() => UserObjType)
  user: UserObjType;

  @Field(() => AddressType)
  address: AddressType;
}
