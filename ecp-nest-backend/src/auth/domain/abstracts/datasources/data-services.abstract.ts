import { AuthUser } from '../../entities/auth-user.entity';
import { IAuthGenericRepository } from '../repositories/generic-repository.abstract';

export abstract class IAuthDataServices {
  abstract auth: IAuthGenericRepository<AuthUser>;
}
