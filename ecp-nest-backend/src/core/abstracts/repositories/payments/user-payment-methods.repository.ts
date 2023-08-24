import { IUserPaymentMethod } from 'src/core/entities';

export abstract class IUserPaymentMethodsRepository {
  abstract getAllUserPaymentMethods(): Promise<IUserPaymentMethod[]>;
  abstract getAllUserPaymentMethodsBy(
    fields: Partial<IUserPaymentMethod>,
  ): Promise<IUserPaymentMethod[]>;
  abstract getOneUserPaymentMethodBy(
    fields: Partial<IUserPaymentMethod>,
  ): Promise<IUserPaymentMethod[]>;
  abstract createUserPaymentMethod(
    createUserPaymentMethodInput: any,
  ): Promise<IUserPaymentMethod>;
  abstract updateUserPaymentMethod(
    updateUserPaymentMethodInput: any,
  ): Promise<IUserPaymentMethod>;
  abstract removeUserPaymentMethod(id: string): Promise<boolean>;
}
