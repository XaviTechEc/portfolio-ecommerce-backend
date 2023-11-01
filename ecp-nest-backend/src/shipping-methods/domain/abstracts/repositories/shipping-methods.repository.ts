import { IGenericArgs } from 'src/common/domain/dtos/graphql/args';
import {
  CreateShippingMethodInput,
  UpdateShippingMethodInput,
} from '../../dtos/graphql/inputs/shipping-method.input';
import { GetAllGenericResponse } from 'src/common/domain/interfaces/responses/get-all-generic-response.interface';

export abstract class IShippingMethodsRepository<T> {
  abstract getAllShippingMethods(
    args?: IGenericArgs<T>,
  ): Promise<GetAllGenericResponse<T>>;
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
