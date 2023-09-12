import { IShippingMethod } from '../../entities/shipping-method.entity';
import { IShippingMethodsRepository } from '../repositories/shipping-methods.repository';

export abstract class IShippingMethodsDataSourceService {
  abstract shippingMethods: IShippingMethodsRepository<IShippingMethod>;
}
