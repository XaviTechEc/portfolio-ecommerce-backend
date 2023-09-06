import {
  IGenericArgs,
  CreateShippingMethodInput,
  UpdateShippingMethodInput,
} from 'src/core/dtos';

export abstract class IShippingMethodsRepository<T> {
  abstract getAllShippingMethods(args?: IGenericArgs<T>): Promise<T[]>;
  abstract getShippingMethodById(id: string): Promise<T>;
  abstract createShippingMethod(
    createShippingMethodInput: CreateShippingMethodInput,
  ): Promise<T>;
  abstract updateShippingMethod(
    id: string,
    updateShippingMethodInput: UpdateShippingMethodInput,
  ): Promise<T>;
  abstract removeShippingMethod(id: string): Promise<T>;
}
