import { IRole } from '../../entities/role.entity';
import { IRolesRepository } from '../repositories/roles.repository';

export abstract class IRolesDataSourceService {
  roles: IRolesRepository<IRole>;
}
