import {
  CreateUserPaymentMethodInput,
  UpdateUserPaymentMethodInput,
} from 'src/core/dtos';
import { IGenericArgs } from '../../../dtos/graphql/args/generic-args.repository';

export abstract class IUserPaymentMethodsRepository<T> {
  abstract getAllUserPaymentMethods(args?: IGenericArgs<T>): Promise<T[]>;
  abstract getAllUserPaymentMethodsBy(
    fields: Partial<T>,
    args?: IGenericArgs<T>,
  ): Promise<T[]>;
  abstract getUserPaymentMethodBy(
    fields: Partial<T>,
    args?: IGenericArgs<T>,
  ): Promise<T>;

  abstract getUserPaymentMethodById(id: string): Promise<T>;
  abstract createUserPaymentMethod(
    createUserPaymentMethodInput: CreateUserPaymentMethodInput,
  ): Promise<T>;
  abstract updateUserPaymentMethod(
    id: string,
    updateUserPaymentMethodInput: UpdateUserPaymentMethodInput,
  ): Promise<T>;
  abstract removeUserPaymentMethod(id: string): Promise<T>;
}
