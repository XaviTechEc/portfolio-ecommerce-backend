import { IPaymentMethodsRepository } from 'src/core/abstracts/repositories';

import { Repository } from 'typeorm';
import { PaymentMethod } from '../../entities/outputs/entities';
import {
  CreatePaymentMethodInput,
  UpdatePaymentMethodInput,
} from 'src/core/dtos';

export class PaymentMethodsRepository
  implements IPaymentMethodsRepository<PaymentMethod>
{
  private _repository: Repository<PaymentMethod>;

  constructor(repository: Repository<PaymentMethod>) {
    this._repository = repository;
  }
  getPaymentMethodById(id: string): Promise<PaymentMethod> {
    throw new Error('Method not implemented.');
  }
  createPaymentMethod(data: CreatePaymentMethodInput): Promise<PaymentMethod> {
    throw new Error('Method not implemented.');
  }
  updatePaymentMethod(
    id: string,
    data: UpdatePaymentMethodInput,
  ): Promise<PaymentMethod> {
    throw new Error('Method not implemented.');
  }
  removePaymentMethod(id: string): Promise<PaymentMethod> {
    throw new Error('Method not implemented.');
  }
}
