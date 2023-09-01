import {
  CreateUserPaymentMethodDto,
  UpdateUserPaymentMethodDto,
} from 'src/core/dtos';
import { IGenericArgs } from '../../../dtos/graphql/args/generic-args.repository';

export abstract class IUserPaymentMethodsRepository<T> {
  abstract getAllUserPaymentMethods(args?: IGenericArgs<T>): Promise<T[]>;
  abstract getAllUserPaymentMethodsBy(
    fields: Partial<T>,
    args?: IGenericArgs<T>,
  ): Promise<T[]>;
  abstract getOneUserPaymentMethodBy(
    fields: Partial<T>,
    args?: IGenericArgs<T>,
  ): Promise<T>;

  abstract getUserPaymentMethodById(id: string): Promise<T>;
  abstract createUserPaymentMethod(
    createUserPaymentMethodInput: CreateUserPaymentMethodDto,
  ): Promise<T>;
  abstract updateUserPaymentMethod(
    id: string,
    updateUserPaymentMethodInput: UpdateUserPaymentMethodDto,
  ): Promise<T>;
  abstract removeUserPaymentMethod(id: string): Promise<T>;
}
