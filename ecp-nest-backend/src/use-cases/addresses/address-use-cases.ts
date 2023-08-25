import { Injectable } from '@nestjs/common';
import { IAddressesRepository } from 'src/core/abstracts/repositories/addresses/addresses.repository';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { IAddress } from 'src/core/entities';
import { AddressFactoryService } from './factory/address-factory.service';
import { CreateAddressInput, UpdateAddressInput } from 'src/core/dtos';

@Injectable()
export class AddressesUseCases implements IAddressesRepository {
  constructor(
    private dataServices: IDataSourcesService,
    private addressFactoryService: AddressFactoryService,
  ) {}

  getAddressById(id: string): Promise<IAddress> {
    return this.dataServices.addresses.getOneById(id);
  }

  getAddressesBy(fields: Partial<IAddress>): Promise<IAddress[]> {
    return this.dataServices.addresses.getAllBy(fields);
  }

  getOneAddressesBy(fields: Partial<IAddress>): Promise<IAddress> {
    return this.dataServices.addresses.getOneBy(fields);
  }

  createAddress(createAddressInput: CreateAddressInput): Promise<IAddress> {
    const address =
      this.addressFactoryService.createAddress(createAddressInput);
    return this.dataServices.addresses.create(address);
  }

  updateAddress(
    id: string,
    updateAddressInput: UpdateAddressInput,
  ): Promise<IAddress> {
    const address =
      this.addressFactoryService.updateAddress(updateAddressInput);
    return this.dataServices.addresses.updateOneById(id, address);
  }

  removeAddress(id: string): Promise<IAddress> {
    return this.dataServices.addresses.deleteOneById(id);
  }
}
