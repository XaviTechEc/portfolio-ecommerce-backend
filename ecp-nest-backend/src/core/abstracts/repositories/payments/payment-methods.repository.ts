import { CreatePaymentMethodDto, UpdatePaymentMethodDto } from 'src/core/dtos';
import { IPaymentMethod } from 'src/core/entities';

export abstract class IPaymentMethodsRepository {
  abstract getPaymentMethodById(id: string): Promise<IPaymentMethod>;
  abstract createPaymentMethod(
    createPaymentMethodInput: CreatePaymentMethodDto,
  ): Promise<IPaymentMethod>;
  abstract updatePaymentMethod(
    id: string,
    updatePaymentMethodInput: UpdatePaymentMethodDto,
  ): Promise<IPaymentMethod>;
  abstract removePaymentMethod(id: string): Promise<IPaymentMethod>;
}
