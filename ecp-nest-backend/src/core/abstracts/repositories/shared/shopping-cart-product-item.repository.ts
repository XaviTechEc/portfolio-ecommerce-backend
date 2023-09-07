import {
  CreateShoppingCartProductItemInput,
  IGenericArgs,
  PaginationArgs,
  UpdateShoppingCartProductItemInput,
} from 'src/core/dtos';

export abstract class IShoppingCartProductItemRepository<T> {
  abstract getAllShoppingCartProductItem(args?: IGenericArgs<T>): Promise<T[]>;
  abstract getShoppingCartProductItemById(id: string): Promise<T>;
  abstract createShoppingCartProductItem(
    createShoppingCartProductItemInput: CreateShoppingCartProductItemInput,
  ): Promise<T>;
  abstract updateShoppingCartProductItem(
    id: string,
    updateShoppingCartProductItemInput: UpdateShoppingCartProductItemInput,
  ): Promise<T>;
  abstract removeShoppingCartProductItem(id: string): Promise<T>;
  abstract getShoppingCartProductItemsBy(
    term: string,
    fields: (keyof T)[],
    paginationArgs: PaginationArgs,
  ): Promise<T[]>;
}
