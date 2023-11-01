import {
  IGenericArgs,
  PaginationArgs,
} from 'src/common/domain/dtos/graphql/args';
import {
  CreateShopOrderInput,
  UpdateShopOrderInput,
} from '../../dtos/graphql/inputs/shop-order.input';
import { GetAllGenericResponse } from 'src/common/domain/interfaces/responses/get-all-generic-response.interface';

export abstract class IShopOrdersRepository<T> {
  abstract getAllShopOrders(
    args?: IGenericArgs<T>,
  ): Promise<GetAllGenericResponse<T>>;

  abstract getShopOrderById(id: string): Promise<T>;

  abstract createShopOrder(
    createShopOrderInput: CreateShopOrderInput,
  ): Promise<T>;
  abstract updateShopOrder(
    id: string,
    updateShopOrderInput: UpdateShopOrderInput,
  ): Promise<T>;
  abstract removeShopOrder(id: string): Promise<T>;

  abstract getShopOrdersBy(
    term: any,
    fields: (keyof T)[],
    paginationArgs: PaginationArgs,
  ): Promise<GetAllGenericResponse<T>>;
}
