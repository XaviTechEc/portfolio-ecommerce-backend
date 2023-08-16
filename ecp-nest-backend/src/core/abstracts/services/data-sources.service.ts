import { IGenericDataMethodsRepository } from '../repositories/generic-data-methods.repository';
import { User } from '../../entities/';

export abstract class IDataSourcesService {
  abstract users: IGenericDataMethodsRepository<User>;
}
