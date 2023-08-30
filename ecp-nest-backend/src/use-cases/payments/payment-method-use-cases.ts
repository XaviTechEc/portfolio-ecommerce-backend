import { Injectable } from '@nestjs/common';
import { IPaymentMethodsRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { CreatePaymentMethodDto, UpdatePaymentMethodDto } from 'src/core/dtos';
import { IPaymentMethod } from 'src/core/entities';
import { PaymentMethodFactoryService } from './factory/payment-method-factory.service';

@Injectable()
export class PaymentMethodUseCases
  implements IPaymentMethodsRepository<IPaymentMethod>
{
  constructor(
    private dataService: IDataSourcesService,
    private paymentMethodFactoryService: PaymentMethodFactoryService,
  ) {}
  getPaymentMethodById(id: string): Promise<IPaymentMethod> {
    throw new Error('Method not implemented.');
  }
  createPaymentMethod(
    createPaymentMethodInput: CreatePaymentMethodDto,
  ): Promise<IPaymentMethod> {
    throw new Error('Method not implemented.');
  }
  updatePaymentMethod(
    id: string,
    updatePaymentMethodInput: UpdatePaymentMethodDto,
  ): Promise<IPaymentMethod> {
    throw new Error('Method not implemented.');
  }
  removePaymentMethod(id: string): Promise<IPaymentMethod> {
    throw new Error('Method not implemented.');
  }
}
