import { IShippingMethod } from 'src/core/entities';

export abstract class IShippingMethodsRepository {
  abstract getAllShippingMethods(): Promise<IShippingMethod[]>;
  abstract getShippingMethodById(id: string): Promise<IShippingMethod>;
  abstract createShippingMethod(
    createShippingMethodInput: any,
  ): Promise<IShippingMethod>;
  abstract updateShippingMethod(
    updateShippingMethodInput: any,
  ): Promise<IShippingMethod>;
  abstract removeShippingMethod(id: string): Promise<IShippingMethod>;
}
