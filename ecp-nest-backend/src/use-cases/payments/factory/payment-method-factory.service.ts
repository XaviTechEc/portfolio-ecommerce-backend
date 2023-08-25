import { Injectable } from '@nestjs/common';
import { CreatePaymentMethodDto, UpdatePaymentMethodDto } from 'src/core/dtos';
import { IPaymentMethod } from 'src/core/entities';

@Injectable()
export class PaymentMethodFactoryService {
  createPaymentMethod(createPaymentMethodDto: CreatePaymentMethodDto) {
    const newPaymentMethod = new IPaymentMethod();
    newPaymentMethod.value = createPaymentMethodDto.value;
    return newPaymentMethod;
  }
  updatePaymentMethod(updatePaymentMethodDto: UpdatePaymentMethodDto) {
    const newPaymentMethod = new IPaymentMethod();
    newPaymentMethod.value = updatePaymentMethodDto.value;
    return newPaymentMethod;
  }
}
