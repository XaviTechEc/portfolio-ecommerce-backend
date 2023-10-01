import { IStore } from '../../entities/store.entity';
import { IStoresRepository } from '../repositories/stores.repository';

export abstract class IStoresDataSourceService {
  abstract stores: IStoresRepository<IStore>;
}
