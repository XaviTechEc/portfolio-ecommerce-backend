import { IUser } from '../../entities/user.entity';
import { IUsersRepository } from '../repositories/users.repository';

export abstract class IUsersDataSourceService {
  abstract users: IUsersRepository<IUser>;
}
