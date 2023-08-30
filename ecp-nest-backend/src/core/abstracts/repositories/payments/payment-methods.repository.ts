import { CreatePaymentMethodDto, UpdatePaymentMethodDto } from 'src/core/dtos';

export abstract class IPaymentMethodsRepository<T> {
  abstract getPaymentMethodById(id: string): Promise<T>;
  abstract createPaymentMethod(
    createPaymentMethodInput: CreatePaymentMethodDto,
  ): Promise<T>;
  abstract updatePaymentMethod(
    id: string,
    updatePaymentMethodInput: UpdatePaymentMethodDto,
  ): Promise<T>;
  abstract removePaymentMethod(id: string): Promise<T>;
}
