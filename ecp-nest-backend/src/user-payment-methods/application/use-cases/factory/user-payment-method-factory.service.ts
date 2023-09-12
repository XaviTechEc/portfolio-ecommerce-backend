import { Injectable } from '@nestjs/common';
import {
  CreateUserPaymentMethodInput,
  UpdateUserPaymentMethodInput,
} from 'src/user-payment-methods/domain/dtos/graphql/inputs/user-payment-method.input';
import { IUserPaymentMethod } from 'src/user-payment-methods/domain/entities/user-payment-method.entity';

@Injectable()
export class UserPaymentMethodFactoryService {
  createUserPaymentMethod(
    createUserPaymentMethodInput: CreateUserPaymentMethodInput,
  ) {
    const newUserPaymentMethod = new IUserPaymentMethod();
    newUserPaymentMethod.user = createUserPaymentMethodInput.user;
    newUserPaymentMethod.paymentMethod =
      createUserPaymentMethodInput.paymentMethod;
    newUserPaymentMethod.provider = createUserPaymentMethodInput.provider;
    newUserPaymentMethod.accountNumber =
      createUserPaymentMethodInput.accountNumber;
    newUserPaymentMethod.expiryDate = createUserPaymentMethodInput.expiryDate;
    newUserPaymentMethod.isDefault = createUserPaymentMethodInput.isDefault;
    return newUserPaymentMethod;
  }
  updateUserPaymentMethod(
    updateUserPaymentMethodInput: UpdateUserPaymentMethodInput,
  ) {
    const newUserPaymentMethod = new IUserPaymentMethod();
    newUserPaymentMethod.user = updateUserPaymentMethodInput.user;
    newUserPaymentMethod.paymentMethod =
      updateUserPaymentMethodInput.paymentMethod;
    newUserPaymentMethod.provider = updateUserPaymentMethodInput.provider;
    newUserPaymentMethod.accountNumber =
      updateUserPaymentMethodInput.accountNumber;
    newUserPaymentMethod.expiryDate = updateUserPaymentMethodInput.expiryDate;
    newUserPaymentMethod.isDefault = updateUserPaymentMethodInput.isDefault;
    return newUserPaymentMethod;
  }
}
