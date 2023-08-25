import {
  CreateUserPaymentMethodDto,
  UpdateUserPaymentMethodDto,
} from 'src/core/dtos';
import { IUserPaymentMethod } from 'src/core/entities';

export abstract class IUserPaymentMethodsRepository {
  abstract getAllUserPaymentMethods(): Promise<IUserPaymentMethod[]>;
  abstract getAllUserPaymentMethodsBy(
    fields: Partial<IUserPaymentMethod>,
  ): Promise<IUserPaymentMethod[]>;
  abstract getOneUserPaymentMethodBy(
    fields: Partial<IUserPaymentMethod>,
  ): Promise<IUserPaymentMethod>;
  abstract createUserPaymentMethod(
    createUserPaymentMethodInput: CreateUserPaymentMethodDto,
  ): Promise<IUserPaymentMethod>;
  abstract updateUserPaymentMethod(
    id: string,
    updateUserPaymentMethodInput: UpdateUserPaymentMethodDto,
  ): Promise<IUserPaymentMethod>;
  abstract removeUserPaymentMethod(id: string): Promise<IUserPaymentMethod>;
}
