import { CreateAddressInput, UpdateAddressInput } from 'src/core/dtos';
import { IGenericArgs } from '../../generic-args.repository';

export abstract class IAddressesRepository<T> {
  abstract getAddressesBy(args?: IGenericArgs<T>): Promise<T[]>;
  abstract getOneAddressBy(
    fields: Partial<T>,
    args?: IGenericArgs<T>,
  ): Promise<T>;
  abstract getAddressById(id: string): Promise<T>;
  abstract createAddress(createAddressInput: CreateAddressInput): Promise<T>;
  abstract updateAddress(
    id: string,
    updateAddressInput: UpdateAddressInput,
  ): Promise<T>;
  abstract removeAddress(id: string): Promise<T>;
}
