import {
  IGenericArgs,
  PaginationArgs,
} from 'src/common/domain/dtos/graphql/args';
import {
  CreateShopOrderLocationInput,
  UpdateShopOrderLocationInput,
} from '../../dtos/graphql/inputs/shop-order-location.input';
import { GetAllGenericResponse } from 'src/common/domain/interfaces/responses/get-all-generic-response.interface';

export abstract class IShopOrderLocationRepository<T> {
  abstract getAllShopOrderLocation(
    args?: IGenericArgs<T>,
  ): Promise<GetAllGenericResponse<T>>;
  abstract getShopOrderLocationById(id: string): Promise<T>;
  abstract createShopOrderLocation(
    createShopOrderLocationInput: CreateShopOrderLocationInput,
  ): Promise<T>;
  abstract updateShopOrderLocation(
    id: string,
    updateShopOrderLocationInput: UpdateShopOrderLocationInput,
  ): Promise<T>;
  abstract removeShopOrderLocation(id: string): Promise<T>;

  abstract getShopOrderLocationsBy(
    term: string,
    fields: (keyof T)[],
    paginationArgs: PaginationArgs,
  ): Promise<GetAllGenericResponse<T>>;
}
