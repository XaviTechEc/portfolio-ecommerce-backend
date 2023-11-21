import { Injectable } from '@nestjs/common';
import {
  GetManyProps,
  GetOneByIdProps,
  CreateProps,
  UpdateOneByIdProps,
  DeleteOneByIdProps,
} from 'src/common/domain/abstracts/generic-data-methods.repository';
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
    private dataServices: IPaymentMethodsDataSourceService,
    private paymentMethodFactoryService: PaymentMethodFactoryService,
  ) {}

  getMany(props: GetManyProps<IPaymentMethod>) {
    return this.dataServices.paymentMethods.getMany({ ...props });
  }

  getOneById(props: GetOneByIdProps) {
    return this.dataServices.paymentMethods.getOneById({ ...props });
  }

  create(props: CreateProps<CreatePaymentMethodInput>) {
    const newPaymentMethod =
      this.paymentMethodFactoryService.createPaymentMethod(props.data);
    return this.dataServices.paymentMethods.create({
      ...props,
      data: newPaymentMethod,
    });
  }

  updateOneById(props: UpdateOneByIdProps<UpdatePaymentMethodInput>) {
    const newPaymentMethod =
      this.paymentMethodFactoryService.updatePaymentMethod(props.data);
    return this.dataServices.paymentMethods.updateOneById({
      ...props,
      data: newPaymentMethod,
    });
  }

  deleteOneById(props: DeleteOneByIdProps) {
    return this.dataServices.paymentMethods.deleteOneById({ ...props });
  }
}
