import { Injectable } from '@nestjs/common';
import {
  CreatePaymentMethodInput,
  UpdatePaymentMethodInput,
} from 'src/payment-methods/domain/dtos/graphql/inputs/payment-method.input';
import { IPaymentMethod } from 'src/payment-methods/domain/entities/payment-method.entity';

@Injectable()
export class PaymentMethodFactoryService {
  createPaymentMethod(createPaymentMethodInput: CreatePaymentMethodInput) {
    const newPaymentMethod = new IPaymentMethod();
    newPaymentMethod.value = createPaymentMethodInput.value;
    newPaymentMethod.active = createPaymentMethodInput.active;
    return newPaymentMethod;
  }
  updatePaymentMethod(updatePaymentMethodInput: UpdatePaymentMethodInput) {
    const newPaymentMethod = new IPaymentMethod();
    newPaymentMethod.id = updatePaymentMethodInput.id;
    newPaymentMethod.value = updatePaymentMethodInput.value;
    newPaymentMethod.active = updatePaymentMethodInput.active;
    return newPaymentMethod;
  }
}
