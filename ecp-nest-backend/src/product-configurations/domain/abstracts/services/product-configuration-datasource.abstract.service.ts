import { IProductConfiguration } from '../../entities/product-configuration.entity';
import { IProductConfigurationRepository } from '../repositories/product-configuration.repository';

export abstract class IProductConfigurationDataSourceService {
  abstract productConfigurations: IProductConfigurationRepository<IProductConfiguration>;
}
