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
    newUserPaymentMethod.userId = createUserPaymentMethodDto.userId;
    newUserPaymentMethod.paymentMethodId =
      createUserPaymentMethodDto.paymentMethodId;
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
    newUserPaymentMethod.userId = updateUserPaymentMethodDto.userId;
    newUserPaymentMethod.paymentMethodId =
      updateUserPaymentMethodDto.paymentMethodId;
    newUserPaymentMethod.provider = updateUserPaymentMethodDto.provider;
    newUserPaymentMethod.accountNumber =
      updateUserPaymentMethodDto.accountNumber;
    newUserPaymentMethod.expiryDate = updateUserPaymentMethodDto.expiryDate;
    newUserPaymentMethod.isDefault = updateUserPaymentMethodDto.isDefault;
    return newUserPaymentMethod;
  }
}
