import {
  IGenericArgs,
  PaginationArgs,
} from 'src/common/domain/dtos/graphql/args';
import {
  CreateUserPaymentMethodInput,
  UpdateUserPaymentMethodInput,
} from '../../dtos/graphql/inputs/user-payment-method.input';
import { GetAllGenericResponse } from 'src/common/domain/interfaces/responses/get-all-generic-response.interface';

export abstract class IUserPaymentMethodsRepository<T> {
  abstract getAllUserPaymentMethods(
    args?: IGenericArgs<T>,
  ): Promise<GetAllGenericResponse<T>>;

  abstract getUserPaymentMethodById(id: string): Promise<T>;
  abstract createUserPaymentMethod(
    createUserPaymentMethodInput: CreateUserPaymentMethodInput,
  ): Promise<T>;
  abstract updateUserPaymentMethod(
    id: string,
    updateUserPaymentMethodInput: UpdateUserPaymentMethodInput,
  ): Promise<T>;
  abstract removeUserPaymentMethod(id: string): Promise<T>;
  abstract getUserPaymentMethodsBy(
    term: string,
    fields: (keyof T)[],
    paginationArgs: PaginationArgs,
  ): Promise<GetAllGenericResponse<T>>;
}
