import { CreateAddressInput, UpdateAddressInput } from 'src/core/dtos';
import { IGenericArgs } from '../../../dtos/graphql/args/generic-args.repository';

export abstract class IAddressesRepository<T> {
  abstract getAllAddresses(args?: IGenericArgs<T>): Promise<T[]>;
  abstract getAddressById(id: string): Promise<T>;
  abstract createAddress(createAddressInput: CreateAddressInput): Promise<T>;
  abstract updateAddress(
    id: string,
    updateAddressInput: UpdateAddressInput,
  ): Promise<T>;
  abstract removeAddress(id: string): Promise<T>;
}
