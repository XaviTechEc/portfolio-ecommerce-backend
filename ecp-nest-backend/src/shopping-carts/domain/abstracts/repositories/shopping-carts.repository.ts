import {
  IGenericArgs,
  PaginationArgs,
} from 'src/common/domain/dtos/graphql/args';
import {
  CreateShoppingCartInput,
  UpdateShoppingCartInput,
} from '../../dtos/graphql/inputs/shopping-cart.input';

export abstract class IShoppingCartsRepository<T> {
  abstract getAllShoppingCarts(args: IGenericArgs<T>): Promise<T[]>;
  abstract getShoppingCartById(id: string): Promise<T>;
  abstract createShoppingCart(
    createShoppingCartInput: CreateShoppingCartInput,
  ): Promise<T>;
  abstract updateShoppingCart(
    id: string,
    updateShoppingCartInput: UpdateShoppingCartInput,
  ): Promise<T>;
  abstract removeShoppingCart(id: string): Promise<T>;

  abstract getShoppingCartsBy(
    term: string,
    fields: (keyof T)[],
    paginationArgs: PaginationArgs,
  ): Promise<T[]>;
}
