import { Injectable } from '@nestjs/common';
import { IGenericArgs } from 'src/common/domain/dtos/graphql/args';
import { IPaymentMethodsDataSourceService } from 'src/payment-methods/domain/abstracts/services/payment-methods-datasource.abstract.service';
import {
  CreatePaymentMethodInput,
  UpdatePaymentMethodInput,
} from 'src/payment-methods/domain/dtos/graphql/inputs/payment-method.input';
import { IPaymentMethod } from 'src/payment-methods/domain/entities/payment-method.entity';
import { PaymentMethodFactoryService } from './factory/payment-method-factory.service';

@Injectable()
export class PaymentMethodUseCases {
  constructor(
    private dataService: IPaymentMethodsDataSourceService,
    private paymentMethodFactoryService: PaymentMethodFactoryService,
  ) {}
  getAllPaymentMethods(args?: IGenericArgs<IPaymentMethod>) {
    return this.dataService.paymentMethods.getAllPaymentMethods(args);
  }
  getPaymentMethodById(id: string): Promise<IPaymentMethod> {
    return this.dataService.paymentMethods.getPaymentMethodById(id);
  }
  createPaymentMethod(
    createPaymentMethodInput: CreatePaymentMethodInput,
  ): Promise<IPaymentMethod> {
    const paymentMethod = this.paymentMethodFactoryService.createPaymentMethod(
      createPaymentMethodInput,
    );
    return this.dataService.paymentMethods.createPaymentMethod(paymentMethod);
  }
  updatePaymentMethod(
    id: string,
    updatePaymentMethodInput: UpdatePaymentMethodInput,
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
