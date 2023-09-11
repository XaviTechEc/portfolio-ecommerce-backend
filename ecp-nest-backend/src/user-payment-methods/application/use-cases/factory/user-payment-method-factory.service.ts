import { Injectable } from '@nestjs/common';
import {
  CreateUserPaymentMethodInput,
  UpdateUserPaymentMethodInput,
} from 'src/core/dtos';
import { IUserPaymentMethod } from 'src/core/entities';

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
