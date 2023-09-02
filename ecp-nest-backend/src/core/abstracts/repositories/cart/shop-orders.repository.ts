import { CreateShopOrderInput, UpdateShopOrderInput } from 'src/core/dtos';
import { IGenericArgs } from '../../../dtos/graphql/args/generic-args.repository';

export abstract class IShopOrdersRepository<T> {
  abstract getAllShopOrders(args?: IGenericArgs<T>): Promise<T[]>;
  abstract getAllShopOrdersBy(
    fields: Partial<T>,
    args?: IGenericArgs<T>,
  ): Promise<T[]>;

  abstract getShopOrderById(id: string): Promise<T>;
  abstract getOneShopOrderBy(
    fields: Partial<T>,
    args?: IGenericArgs<T>,
  ): Promise<T>;
  abstract createShopOrder(
    createShopOrderInput: CreateShopOrderInput,
  ): Promise<T>;
  abstract updateShopOrder(
    id: string,
    updateShopOrderInput: UpdateShopOrderInput,
  ): Promise<T>;
  abstract removeShopOrder(id: string): Promise<T>;
}
