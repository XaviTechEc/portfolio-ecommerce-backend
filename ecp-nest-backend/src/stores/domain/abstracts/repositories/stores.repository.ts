import { IGenericArgs } from 'src/common/domain/dtos/graphql/args';
import {
  CreateStoreInput,
  UpdateStoreInput,
} from '../../dtos/graphql/inputs/store.input';
import { GetAllGenericResponse } from 'src/common/domain/interfaces/responses/get-all-generic-response.interface';

export abstract class IStoresRepository<T> {
  abstract getAllStores(
    args?: IGenericArgs<T>,
  ): Promise<GetAllGenericResponse<T>>;
  abstract getStoreById(id: string): Promise<T>;
  abstract createStore(createStoreInput: CreateStoreInput): Promise<T>;
  abstract updateStore(
    id: string,
    updateStoreInput: UpdateStoreInput,
  ): Promise<T>;
  abstract removeStore(id: string): Promise<T>;
}
