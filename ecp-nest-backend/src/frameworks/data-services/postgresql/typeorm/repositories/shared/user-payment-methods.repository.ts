import { IUserPaymentMethodsRepository } from 'src/core/abstracts/repositories';
import { Repository } from 'typeorm';
import { UserPaymentMethod } from '../../entities/outputs/entities';
import {
  IGenericArgs,
  CreateUserPaymentMethodInput,
  UpdateUserPaymentMethodInput,
} from 'src/core/dtos';

export class UserPaymentMethodsRepository
  implements IUserPaymentMethodsRepository<UserPaymentMethod>
{
  private _repository: Repository<UserPaymentMethod>;

  constructor(repository: Repository<UserPaymentMethod>) {
    this._repository = repository;
  }
  getAllUserPaymentMethods(
    args?: IGenericArgs<UserPaymentMethod>,
  ): Promise<UserPaymentMethod[]> {
    throw new Error('Method not implemented.');
  }
  getAllUserPaymentMethodsBy(
    fields: Partial<UserPaymentMethod>,
    args?: IGenericArgs<UserPaymentMethod>,
  ): Promise<UserPaymentMethod[]> {
    throw new Error('Method not implemented.');
  }
  getUserPaymentMethodBy(
    fields: Partial<UserPaymentMethod>,
    args?: IGenericArgs<UserPaymentMethod>,
  ): Promise<UserPaymentMethod> {
    throw new Error('Method not implemented.');
  }
  getUserPaymentMethodById(id: string): Promise<UserPaymentMethod> {
    throw new Error('Method not implemented.');
  }
  createUserPaymentMethod(
    createUserPaymentMethodInput: CreateUserPaymentMethodInput,
  ): Promise<UserPaymentMethod> {
    throw new Error('Method not implemented.');
  }
  updateUserPaymentMethod(
    id: string,
    updateUserPaymentMethodInput: UpdateUserPaymentMethodInput,
  ): Promise<UserPaymentMethod> {
    throw new Error('Method not implemented.');
  }
  removeUserPaymentMethod(id: string): Promise<UserPaymentMethod> {
    throw new Error('Method not implemented.');
  }
}
