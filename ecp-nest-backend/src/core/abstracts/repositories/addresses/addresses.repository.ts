import { CreateAddressInput, UpdateAddressInput } from 'src/core/dtos';
import { IAddress } from 'src/core/entities';

export abstract class IAddressesRepository {
  abstract getAddressById(id: string): Promise<IAddress>;
  abstract getAddressesBy(fields: Partial<IAddress>): Promise<IAddress[]>;
  abstract getOneAddressesBy(fields: Partial<IAddress>): Promise<IAddress>;
  abstract createAddress(
    createAddressInput: CreateAddressInput,
  ): Promise<IAddress>;
  abstract updateAddress(
    id: string,
    updateAddressInput: UpdateAddressInput,
  ): Promise<IAddress>;
  abstract removeAddress(id: string): Promise<IAddress>;
}
