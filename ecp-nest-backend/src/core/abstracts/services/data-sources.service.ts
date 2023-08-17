import { IGenericDataMethodsRepository } from '../repositories/generic-data-methods.repository';
import { User } from '../../entities/';

export abstract class IDataServices {
  abstract users: IGenericDataMethodsRepository<User>;
}
