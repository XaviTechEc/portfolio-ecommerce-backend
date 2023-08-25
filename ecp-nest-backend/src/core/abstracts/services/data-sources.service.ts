import { IProduct, IUser } from 'src/core/entities';
import { IGenericDataMethodsRepository } from '../repositories/shared/generic-data-methods.repository';

export abstract class IDataSourcesService {
  abstract users: IGenericDataMethodsRepository<IUser>;
  abstract products: IGenericDataMethodsRepository<IProduct>;
}
