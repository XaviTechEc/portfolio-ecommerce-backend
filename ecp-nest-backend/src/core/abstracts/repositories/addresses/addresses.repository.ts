import {
  IGenericArgs,
  CreateAddressInput,
  UpdateAddressInput,
  PaginationArgs,
} from 'src/core/dtos';

export abstract class IAddressesRepository<T> {
  abstract getAllAddresses(args?: IGenericArgs<T>): Promise<T[]>;
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
  ): Promise<T[]>;
}
