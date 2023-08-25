import {
  CreateShippingMethodInput,
  UpdateShippingMethodInput,
} from 'src/core/dtos';
import { IShippingMethod } from 'src/core/entities';

export abstract class IShippingMethodsRepository {
  abstract getAllShippingMethods(): Promise<IShippingMethod[]>;
  abstract getShippingMethodById(id: string): Promise<IShippingMethod>;
  abstract createShippingMethod(
    createShippingMethodInput: CreateShippingMethodInput,
  ): Promise<IShippingMethod>;
  abstract updateShippingMethod(
    id: string,
    updateShippingMethodInput: UpdateShippingMethodInput,
  ): Promise<IShippingMethod>;
  abstract removeShippingMethod(id: string): Promise<IShippingMethod>;
}
