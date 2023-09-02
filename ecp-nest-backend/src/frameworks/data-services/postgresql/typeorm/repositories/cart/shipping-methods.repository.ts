import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';
import { IShippingMethodsRepository } from 'src/core/abstracts/repositories';
import {
  CreateShippingMethodInput,
  UpdateShippingMethodInput,
} from 'src/core/dtos';
import { Repository } from 'typeorm';
import { ShippingMethod } from '../../entities/outputs/entities';

export class ShippingMethodsRepository
  implements IShippingMethodsRepository<ShippingMethod>
{
  private _repository: Repository<ShippingMethod>;

  constructor(repository: Repository<ShippingMethod>) {
    this._repository = repository;
  }
  getAllShippingMethods(
    args?: IGenericArgs<ShippingMethod>,
  ): Promise<ShippingMethod[]> {
    throw new Error('Method not implemented.');
  }
  getShippingMethodById(id: string): Promise<ShippingMethod> {
    throw new Error('Method not implemented.');
  }
  createShippingMethod(
    createShippingMethodInput: CreateShippingMethodInput,
  ): Promise<ShippingMethod> {
    throw new Error('Method not implemented.');
  }
  updateShippingMethod(
    id: string,
    updateShippingMethodInput: UpdateShippingMethodInput,
  ): Promise<ShippingMethod> {
    throw new Error('Method not implemented.');
  }
  removeShippingMethod(id: string): Promise<ShippingMethod> {
    throw new Error('Method not implemented.');
  }
}
