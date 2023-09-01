import {
  CreateShoppingCartInput,
  UpdateShoppingCartInput,
} from 'src/core/dtos';
import { IGenericArgs } from '../../../dtos/graphql/args/generic-args.repository';

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
}
