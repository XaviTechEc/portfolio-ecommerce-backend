import { IShoppingCart } from 'src/core/entities';

export abstract class IShoppingCartsRepository {
  abstract getShoppingCartById(id: string): Promise<IShoppingCart>;
  abstract createShoppingCart(
    createShoppingCartInput: any,
  ): Promise<IShoppingCart>;
  abstract updateShoppingCart(
    updateShoppingCartInput: any,
  ): Promise<IShoppingCart>;
  abstract removeShoppingCart(id: string): Promise<IShoppingCart>;
}
