import { IPaymentMethod } from '../../entities/payment-method.entity';
import { IPaymentMethodsRepository } from '../repositories/payment-methods.repository';

export abstract class IPaymentMethodsDataSourceService {
  abstract paymentMethods: IPaymentMethodsRepository<IPaymentMethod>;
}
