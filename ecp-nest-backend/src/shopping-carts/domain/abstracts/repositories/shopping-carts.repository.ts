import {
  IGenericArgs,
  PaginationArgs,
} from 'src/common/domain/dtos/graphql/args';
import {
  CreateShoppingCartInput,
  UpdateShoppingCartInput,
} from '../../dtos/graphql/inputs/shopping-cart.input';
import { GetAllGenericResponse } from 'src/common/domain/interfaces/responses/get-all-generic-response.interface';

export abstract class IShoppingCartsRepository<T> {
  abstract getAllShoppingCarts(
    args: IGenericArgs<T>,
  ): Promise<GetAllGenericResponse<T>>;
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
  ): Promise<GetAllGenericResponse<T>>;
}
