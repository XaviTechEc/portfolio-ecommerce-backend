import { Injectable } from '@nestjs/common';
import { IAddressDataSourceService } from 'src/addresses/domain/abstracts/services/address-datasource.abstract.service';
import {
  CreateAddressInput,
  UpdateAddressInput,
} from 'src/addresses/domain/dtos/graphql/inputs/address.input';
import { IAddress } from 'src/addresses/domain/entities/address.entity';
import {
  IGenericArgs,
  PaginationArgs,
} from 'src/common/domain/dtos/graphql/args';
import { AddressFactoryService } from './factory';

@Injectable()
export class AddressesUseCases {
  constructor(
    private dataServices: IAddressDataSourceService,
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
