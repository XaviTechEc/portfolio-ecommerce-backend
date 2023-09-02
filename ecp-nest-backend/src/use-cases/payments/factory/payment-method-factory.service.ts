import { Injectable } from '@nestjs/common';
import {
  CreatePaymentMethodInput,
  UpdatePaymentMethodInput,
} from 'src/core/dtos';

import { IPaymentMethod } from 'src/core/entities';

@Injectable()
export class PaymentMethodFactoryService {
  createPaymentMethod(createPaymentMethodInput: CreatePaymentMethodInput) {
    const newPaymentMethod = new IPaymentMethod();
    newPaymentMethod.value = createPaymentMethodInput.value;
    return newPaymentMethod;
  }
  updatePaymentMethod(updatePaymentMethodInput: UpdatePaymentMethodInput) {
    const newPaymentMethod = new IPaymentMethod();
    newPaymentMethod.value = updatePaymentMethodInput.value;
    return newPaymentMethod;
  }
}
