import { IGenericArgs } from 'src/common/domain/dtos/graphql/args';
import { GetAllGenericResponse } from 'src/common/domain/interfaces/responses/get-all-generic-response.interface';

export abstract class IPaymentMethodsRepository<T> {
  abstract getAllPaymentMethods(
    args?: IGenericArgs<T>,
  ): Promise<GetAllGenericResponse<T>>;
  abstract getPaymentMethodById(id: string): Promise<T>;
  abstract createPaymentMethod(data: T): Promise<T>;
  abstract updatePaymentMethod(id: string, data: T): Promise<T>;
  abstract removePaymentMethod(id: string): Promise<T>;
}
