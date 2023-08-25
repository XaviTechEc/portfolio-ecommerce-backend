import {
  CreateShoppingCartInput,
  UpdateShoppingCartInput,
} from 'src/core/dtos';
import { IShoppingCart } from 'src/core/entities';

export abstract class IShoppingCartsRepository {
  abstract getShoppingCartById(id: string): Promise<IShoppingCart>;
  abstract createShoppingCart(
    createShoppingCartInput: CreateShoppingCartInput,
  ): Promise<IShoppingCart>;
  abstract updateShoppingCart(
    id: string,
    updateShoppingCartInput: UpdateShoppingCartInput,
  ): Promise<IShoppingCart>;
  abstract removeShoppingCart(id: string): Promise<IShoppingCart>;
}
