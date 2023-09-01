import { Injectable } from '@nestjs/common';
import {
  CreateUserPaymentMethodDto,
  UpdateUserPaymentMethodDto,
} from 'src/core/dtos';
import { IUserPaymentMethod } from 'src/core/entities';

@Injectable()
export class UserPaymentMethodFactoryService {
  createUserPaymentMethod(
    createUserPaymentMethodDto: CreateUserPaymentMethodDto,
  ) {
    const newUserPaymentMethod = new IUserPaymentMethod();
    newUserPaymentMethod.user = createUserPaymentMethodDto.user;
    newUserPaymentMethod.paymentMethod =
      createUserPaymentMethodDto.paymentMethod;
    newUserPaymentMethod.provider = createUserPaymentMethodDto.provider;
    newUserPaymentMethod.accountNumber =
      createUserPaymentMethodDto.accountNumber;
    newUserPaymentMethod.expiryDate = createUserPaymentMethodDto.expiryDate;
    newUserPaymentMethod.isDefault = createUserPaymentMethodDto.isDefault;
    return newUserPaymentMethod;
  }
  updateUserPaymentMethod(
    updateUserPaymentMethodDto: UpdateUserPaymentMethodDto,
  ) {
    const newUserPaymentMethod = new IUserPaymentMethod();
    newUserPaymentMethod.user = updateUserPaymentMethodDto.user;
    newUserPaymentMethod.paymentMethod =
      updateUserPaymentMethodDto.paymentMethod;
    newUserPaymentMethod.provider = updateUserPaymentMethodDto.provider;
    newUserPaymentMethod.accountNumber =
      updateUserPaymentMethodDto.accountNumber;
    newUserPaymentMethod.expiryDate = updateUserPaymentMethodDto.expiryDate;
    newUserPaymentMethod.isDefault = updateUserPaymentMethodDto.isDefault;
    return newUserPaymentMethod;
  }
}
