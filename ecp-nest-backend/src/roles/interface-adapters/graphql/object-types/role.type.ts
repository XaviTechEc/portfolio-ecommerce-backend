import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { PermissionType } from 'src/permissions/interface-adapters/graphql/object-types/permission.type';
import { RoleValue } from 'src/roles/domain/enums/role-value.enum';
import { UserObjType } from 'src/users/interface-adapters/graphql/object-types/user.type';

@ObjectType()
export class RoleType extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  @Field(() => ID, { name: 'id' })
  id: string;

  @Field(() => RoleValue, { name: 'value' })
  value: string;

  // Relations
  @Field(() => [UserObjType], { name: 'users' })
  users: UserObjType[];

  @Field(() => [PermissionType], { name: 'permissions' })
  permissions: PermissionType[];
}
