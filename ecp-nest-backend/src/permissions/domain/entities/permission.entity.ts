import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { PermissionEntityAccess } from 'src/permissions/domain/enums/permission-entity.enum';
import { PermissionOperation } from 'src/permissions/domain/enums/permission-operation.enum';

export class IPermission extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  id: string;
  entity: PermissionEntityAccess;
  operation: PermissionOperation;
}
