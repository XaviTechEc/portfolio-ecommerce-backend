import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';
import { IUserPaymentMethodsRepository } from 'src/core/abstracts/repositories';
import {
  CreateUserPaymentMethodDto,
  UpdateUserPaymentMethodDto,
} from 'src/core/dtos';
import { Repository } from 'typeorm';

export class UserPaymentMethodsRepository<T>
  implements IUserPaymentMethodsRepository<T>
{
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }
  getAllUserPaymentMethods(args?: IGenericArgs<T>): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  getAllUserPaymentMethodsBy(
    fields: Partial<T>,
    args?: IGenericArgs<T>,
  ): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  getOneUserPaymentMethodBy(
    fields: Partial<T>,
    args?: IGenericArgs<T>,
  ): Promise<T> {
    throw new Error('Method not implemented.');
  }
  getUserPaymentMethodById(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
  createUserPaymentMethod(
    createUserPaymentMethodInput: CreateUserPaymentMethodDto,
  ): Promise<T> {
    throw new Error('Method not implemented.');
  }
  updateUserPaymentMethod(
    id: string,
    updateUserPaymentMethodInput: UpdateUserPaymentMethodDto,
  ): Promise<T> {
    throw new Error('Method not implemented.');
  }
  removeUserPaymentMethod(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
}
