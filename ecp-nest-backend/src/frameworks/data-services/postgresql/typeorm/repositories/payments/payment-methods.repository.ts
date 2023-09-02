import { IPaymentMethodsRepository } from 'src/core/abstracts/repositories';
import { CreatePaymentMethodDto, UpdatePaymentMethodDto } from 'src/core/dtos';
import { Repository } from 'typeorm';

export class PaymentMethodsRepository<T>
  implements IPaymentMethodsRepository<T>
{
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }
  getPaymentMethodById(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
  createPaymentMethod(
    createPaymentMethodInput: CreatePaymentMethodDto,
  ): Promise<T> {
    throw new Error('Method not implemented.');
  }
  updatePaymentMethod(
    id: string,
    updatePaymentMethodInput: UpdatePaymentMethodDto,
  ): Promise<T> {
    throw new Error('Method not implemented.');
  }
  removePaymentMethod(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
}
