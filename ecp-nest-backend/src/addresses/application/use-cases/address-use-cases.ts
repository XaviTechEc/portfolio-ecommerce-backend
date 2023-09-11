import { Injectable } from '@nestjs/common';
import { IAddressesRepository } from 'src/addresses/domain/abstracts/repositories/addresses.repository';
import {
  CreateAddressInput,
  UpdateAddressInput,
} from 'src/addresses/domain/dtos/graphql/inputs/address.input';
import { IAddress } from 'src/addresses/domain/entities/address.entity';
import { IDataSourcesService } from 'src/common/domain/abstracts/services';
import {
  PaginationArgs,
  IGenericArgs,
} from 'src/common/domain/dtos/graphql/args';
import { AddressFactoryService } from './factory';

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
