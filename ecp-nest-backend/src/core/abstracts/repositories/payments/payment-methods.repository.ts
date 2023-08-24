import { IPaymentMethod } from 'src/core/entities';

export abstract class IPaymentMethodsRepository {
  abstract getPaymentMethodById(id: string): Promise<IPaymentMethod>;
  abstract createPaymentMethod(
    createPaymentMethodInput: any,
  ): Promise<IPaymentMethod>;
  abstract updatePaymentMethod(
    updatePaymentMethodInput: any,
  ): Promise<IPaymentMethod>;
  abstract removePaymentMethod(id: string): Promise<IPaymentMethod>;
}
