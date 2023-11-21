import { IPermission } from '../../entities/permission.entity';
import { IPermissionsRepository } from '../repositories/permissions.repository';

export abstract class IPermissionsDataSourceService {
  permissions: IPermissionsRepository<IPermission>;
}
