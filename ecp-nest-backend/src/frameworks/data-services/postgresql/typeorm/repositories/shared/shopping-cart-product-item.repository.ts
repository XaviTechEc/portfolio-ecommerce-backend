import { IShoppingCartProductItemRepository } from 'src/core/abstracts/repositories';
import { Repository } from 'typeorm';
import { ShoppingCartProductItem } from '../../entities/outputs/entities';
import {
  IGenericArgs,
  CreateShoppingCartProductItemInput,
  UpdateShoppingCartProductItemInput,
} from 'src/core/dtos';

export class ShoppingCartProductItemsRepository
  implements IShoppingCartProductItemRepository<ShoppingCartProductItem>
{
  private _repository: Repository<ShoppingCartProductItem>;

  constructor(repository: Repository<ShoppingCartProductItem>) {
    this._repository = repository;
  }
  getAllShoppingCartProductItem(
    args?: IGenericArgs<ShoppingCartProductItem>,
  ): Promise<ShoppingCartProductItem[]> {
    throw new Error('Method not implemented.');
  }
  getShoppingCartProductItemById(id: string): Promise<ShoppingCartProductItem> {
    throw new Error('Method not implemented.');
  }
  createShoppingCartProductItem(
    createShoppingCartProductItemInput: CreateShoppingCartProductItemInput,
  ): Promise<ShoppingCartProductItem> {
    throw new Error('Method not implemented.');
  }
  updateShoppingCartProductItem(
    id: string,
    updateShoppingCartProductItemInput: UpdateShoppingCartProductItemInput,
  ): Promise<ShoppingCartProductItem> {
    throw new Error('Method not implemented.');
  }
  removeShoppingCartProductItem(id: string): Promise<ShoppingCartProductItem> {
    throw new Error('Method not implemented.');
  }
}
