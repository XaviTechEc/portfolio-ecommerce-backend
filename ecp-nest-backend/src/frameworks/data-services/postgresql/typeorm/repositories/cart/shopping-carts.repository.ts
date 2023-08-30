import { IGenericArgs } from 'src/core/abstracts/generic-args.repository';
import { IShoppingCartsRepository } from 'src/core/abstracts/repositories';
import {
  CreateShoppingCartInput,
  UpdateShoppingCartInput,
} from 'src/core/dtos';
import { Repository } from 'typeorm';

export class ShoppingCartsRepository<T> implements IShoppingCartsRepository<T> {
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }
  getAllShoppingCarts(args: IGenericArgs<T>): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  getShoppingCartById(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
  createShoppingCart(
    createShoppingCartInput: CreateShoppingCartInput,
  ): Promise<T> {
    throw new Error('Method not implemented.');
  }
  updateShoppingCart(
    id: string,
    updateShoppingCartInput: UpdateShoppingCartInput,
  ): Promise<T> {
    throw new Error('Method not implemented.');
  }
  removeShoppingCart(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
}
