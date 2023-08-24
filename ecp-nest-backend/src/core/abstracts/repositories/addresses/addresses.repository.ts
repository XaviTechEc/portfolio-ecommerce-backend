import { IAddress } from 'src/core/entities';

export abstract class IAddressesRepository {
  abstract getAddressById(id: string): Promise<IAddress>;
  abstract getAddressesBy(fields: Partial<IAddress>): Promise<IAddress[]>;
  abstract getOneAddressesBy(fields: Partial<IAddress>): Promise<IAddress>;
  abstract createAddress(createAddressInput: any): Promise<IAddress>;
  abstract updateAddress(updateAddressInput: any): Promise<IAddress>;
  abstract removeAddress(id: string): Promise<boolean>;
}
