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
    return this.dataService.paymentMethods.getPaymentMethodById(id);
  }
  createPaymentMethod(
    createPaymentMethodInput: CreatePaymentMethodDto,
  ): Promise<IPaymentMethod> {
    const paymentMethod = this.paymentMethodFactoryService.createPaymentMethod(
      createPaymentMethodInput,
    );
    return this.dataService.paymentMethods.createPaymentMethod(paymentMethod);
  }
  updatePaymentMethod(
    id: string,
    updatePaymentMethodInput: UpdatePaymentMethodDto,
  ): Promise<IPaymentMethod> {
    const paymentMethod = this.paymentMethodFactoryService.updatePaymentMethod(
      updatePaymentMethodInput,
    );
    return this.dataService.paymentMethods.updatePaymentMethod(
      id,
      paymentMethod,
    );
  }
  removePaymentMethod(id: string): Promise<IPaymentMethod> {
    return this.dataService.paymentMethods.removePaymentMethod(id);
  }
}
