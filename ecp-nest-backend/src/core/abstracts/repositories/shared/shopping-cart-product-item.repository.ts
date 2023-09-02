import {
  CreateShoppingCartProductItemInput,
  IGenericArgs,
  UpdateShoppingCartProductItemInput,
} from 'src/core/dtos';

export abstract class IShoppingCartProductItemRepository<T> {
  abstract getAllShoppingCartProductItem(args?: IGenericArgs<T>): Promise<T[]>;
  abstract getOneShoppingCartProductItemById(id: string): Promise<T>;
  abstract createShoppingCartProductItem(
    createShoppingCartProductItemInput: CreateShoppingCartProductItemInput,
  ): Promise<T>;
  abstract updateOneShoppingCartProductItemById(
    id: string,
    updateShoppingCartProductItemInput: UpdateShoppingCartProductItemInput,
  ): Promise<T>;
  abstract deleteOneShoppingCartProductItemById(id: string): Promise<T>;
}
