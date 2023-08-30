import { IGenericArgs } from 'src/core/abstracts/generic-args.repository';
import { IShippingMethodsRepository } from 'src/core/abstracts/repositories';
import {
  CreateShippingMethodInput,
  UpdateShippingMethodInput,
} from 'src/core/dtos';
import { Repository } from 'typeorm';

export class ShippingMethodsRepository<T>
  implements IShippingMethodsRepository<T>
{
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }

  getAllShippingMethods(args?: IGenericArgs<T>): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  getShippingMethodById(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
  createShippingMethod(
    createShippingMethodInput: CreateShippingMethodInput,
  ): Promise<T> {
    throw new Error('Method not implemented.');
  }
  updateShippingMethod(
    id: string,
    updateShippingMethodInput: UpdateShippingMethodInput,
  ): Promise<T> {
    throw new Error('Method not implemented.');
  }
  removeShippingMethod(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
}
