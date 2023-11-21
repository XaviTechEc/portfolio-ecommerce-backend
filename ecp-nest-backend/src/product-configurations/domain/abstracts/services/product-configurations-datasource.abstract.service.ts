import { IProductConfiguration } from '../../entities/product-configuration.entity';
import { IProductConfigurationsRepository } from '../repositories/product-configuration.repository';

export abstract class IProductConfigurationsDataSourceService {
  abstract productConfigurations: IProductConfigurationsRepository<IProductConfiguration>;
}
