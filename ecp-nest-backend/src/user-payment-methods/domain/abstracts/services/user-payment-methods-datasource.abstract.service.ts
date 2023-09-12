import { IUserPaymentMethod } from '../../entities/user-payment-method.entity';
import { IUserPaymentMethodsRepository } from '../repositories/user-payment-methods.repository';

export abstract class IUserPaymentMethodsDataSourceService {
  abstract userPaymentMethods: IUserPaymentMethodsRepository<IUserPaymentMethod>;
}
