import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';
import { IShoppingCartsRepository } from 'src/core/abstracts/repositories';
import {
  CreateShoppingCartInput,
  UpdateShoppingCartInput,
} from 'src/core/dtos';
import { Repository } from 'typeorm';
import { ShoppingCart } from '../../entities/outputs/entities';

export class ShoppingCartsRepository
  implements IShoppingCartsRepository<ShoppingCart>
{
  private _repository: Repository<ShoppingCart>;

  constructor(repository: Repository<ShoppingCart>) {
    this._repository = repository;
  }
  getAllShoppingCarts(
    args: IGenericArgs<ShoppingCart>,
  ): Promise<ShoppingCart[]> {
    throw new Error('Method not implemented.');
  }
  getShoppingCartById(id: string): Promise<ShoppingCart> {
    throw new Error('Method not implemented.');
  }
  createShoppingCart(
    createShoppingCartInput: CreateShoppingCartInput,
  ): Promise<ShoppingCart> {
    throw new Error('Method not implemented.');
  }
  updateShoppingCart(
    id: string,
    updateShoppingCartInput: UpdateShoppingCartInput,
  ): Promise<ShoppingCart> {
    throw new Error('Method not implemented.');
  }
  removeShoppingCart(id: string): Promise<ShoppingCart> {
    throw new Error('Method not implemented.');
  }
}
