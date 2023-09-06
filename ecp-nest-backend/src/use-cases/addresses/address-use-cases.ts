import { Injectable } from '@nestjs/common';
import { IAddressesRepository } from 'src/core/abstracts/repositories/addresses/addresses.repository';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { IAddress } from 'src/core/entities';
import { AddressFactoryService } from './factory/address-factory.service';
import {
  CreateAddressInput,
  PaginationArgs,
  UpdateAddressInput,
} from 'src/core/dtos';
import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';

@Injectable()
export class AddressesUseCases implements IAddressesRepository<IAddress> {
  constructor(
    private dataServices: IDataSourcesService,
    private addressFactoryService: AddressFactoryService,
  ) {}
  getAddressesBy(
    term: string,
    fields: (keyof IAddress)[],
    paginationArgs?: PaginationArgs,
  ): Promise<IAddress[]> {
    return this.dataServices.addresses.getAddressesBy(
      term,
      fields,
      paginationArgs,
    );
  }
  getAllAddresses(args?: IGenericArgs<IAddress>): Promise<IAddress[]> {
    return this.dataServices.addresses.getAllAddresses(args);
  }
  getAddressById(id: string): Promise<IAddress> {
    return this.dataServices.addresses.getAddressById(id);
  }
  createAddress(createAddressInput: CreateAddressInput): Promise<IAddress> {
    const newAddress =
      this.addressFactoryService.createAddress(createAddressInput);
    return this.dataServices.addresses.createAddress(newAddress);
  }
  updateAddress(
    id: string,
    updateAddressInput: UpdateAddressInput,
  ): Promise<IAddress> {
    const newAddress =
      this.addressFactoryService.updateAddress(updateAddressInput);
    return this.dataServices.addresses.updateAddress(id, newAddress);
  }
  removeAddress(id: string): Promise<IAddress> {
    return this.dataServices.addresses.removeAddress(id);
  }
}
