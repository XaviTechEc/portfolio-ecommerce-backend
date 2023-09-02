import {
  CreateShopOrderLocationInput,
  IGenericArgs,
  UpdateShopOrderLocationInput,
} from 'src/core/dtos';

export abstract class IShopOrderLocationRepository<T> {
  abstract getAllShopOrderLocation(args?: IGenericArgs<T>): Promise<T[]>;
  abstract getOneShopOrderLocationById(id: string): Promise<T>;
  abstract createShopOrderLocation(
    createShopOrderLocationInput: CreateShopOrderLocationInput,
  ): Promise<T>;
  abstract updateOneShopOrderLocationById(
    id: string,
    updateShopOrderLocationInput: UpdateShopOrderLocationInput,
  ): Promise<T>;
  abstract deleteOneShopOrderLocationById(id: string): Promise<T>;
}
