import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { PermissionEntityAccess } from 'src/permissions/domain/enums/permission-entity.enum';
import { PermissionOperation } from 'src/permissions/domain/enums/permission-operation.enum';
import { RoleType } from 'src/roles/interface-adapters/graphql/object-types/role.type';

@ObjectType()
export class PermissionType extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  @Field(() => ID, { name: 'id' })
  id: string;

  @Field(() => PermissionEntityAccess, { name: 'entity' })
  entity: PermissionEntityAccess;

  @Field(() => PermissionOperation, { name: 'operation' })
  operation: PermissionOperation;

  @Field(() => [RoleType], { name: 'roles' })
  roles: RoleType[];
}
