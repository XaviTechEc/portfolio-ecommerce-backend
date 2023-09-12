import {
  IGenericArgs,
  PaginationArgs,
} from 'src/common/domain/dtos/graphql/args';
import {
  CreateShoppingCartProductItemInput,
  UpdateShoppingCartProductItemInput,
} from '../../dtos/graphql/inputs/shopping-cart-product-item.input';

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
