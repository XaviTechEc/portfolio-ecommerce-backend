import {
  IGenericArgs,
  CreateUserPaymentMethodInput,
  UpdateUserPaymentMethodInput,
  PaginationArgs,
} from 'src/core/dtos';

export abstract class IUserPaymentMethodsRepository<T> {
  abstract getAllUserPaymentMethods(args?: IGenericArgs<T>): Promise<T[]>;

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
  ): Promise<T[]>;
}
