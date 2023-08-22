import { User } from 'src/core/entities';
import { IGenericDataMethodsRepository } from '../repositories/generic-data-methods.repository';

export abstract class IDataSourcesService {
  abstract users: IGenericDataMethodsRepository<User>;
}
