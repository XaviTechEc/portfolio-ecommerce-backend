import { IGenericArgs } from 'src/core/abstracts/generic-args.repository';
import { IShopOrdersRepository } from 'src/core/abstracts/repositories';
import { CreateShopOrderInput, UpdateShopOrderInput } from 'src/core/dtos';
import { Repository } from 'typeorm';

export class ShopOrdersRepository<T> implements IShopOrdersRepository<T> {
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }

  getAllShopOrders(args?: IGenericArgs<T>): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  getAllShopOrdersBy(fields: Partial<T>, args?: IGenericArgs<T>): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  getShopOrderById(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
  getOneShopOrderBy(fields: Partial<T>, args?: IGenericArgs<T>): Promise<T> {
    throw new Error('Method not implemented.');
  }
  createShopOrder(createShopOrderInput: CreateShopOrderInput): Promise<T> {
    throw new Error('Method not implemented.');
  }
  updateShopOrder(
    id: string,
    updateShopOrderInput: UpdateShopOrderInput,
  ): Promise<T> {
    throw new Error('Method not implemented.');
  }
  removeShopOrder(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
}
