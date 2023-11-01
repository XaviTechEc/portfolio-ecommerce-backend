import {
  IGenericArgs,
  PaginationArgs,
} from 'src/common/domain/dtos/graphql/args';
import {
  CreateAddressInput,
  UpdateAddressInput,
} from '../../dtos/graphql/inputs/address.input';
import { GetAllGenericResponse } from 'src/common/domain/interfaces/responses/get-all-generic-response.interface';

export abstract class IAddressesRepository<T> {
  abstract getAllAddresses(
    args?: IGenericArgs<T>,
  ): Promise<GetAllGenericResponse<T>>;
  abstract getAddressById(id: string): Promise<T>;
  abstract createAddress(createAddressInput: CreateAddressInput): Promise<T>;
  abstract updateAddress(
    id: string,
    updateAddressInput: UpdateAddressInput,
  ): Promise<T>;
  abstract removeAddress(id: string): Promise<T>;
  abstract getAddressesBy(
    term: string,
    fields: (keyof T)[],
    paginationArgs?: PaginationArgs,
  ): Promise<GetAllGenericResponse<T>>;
}
