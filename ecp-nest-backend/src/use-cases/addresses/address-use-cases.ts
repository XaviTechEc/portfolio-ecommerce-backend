import { Injectable } from '@nestjs/common';
import { IAddressesRepository } from 'src/core/abstracts/repositories/addresses/addresses.repository';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { IAddress } from 'src/core/entities';
import { AddressFactoryService } from './factory/address-factory.service';
import { CreateAddressInput, UpdateAddressInput } from 'src/core/dtos';
import { IGenericArgs } from 'src/core/abstracts/generic-args.repository';

@Injectable()
export class AddressesUseCases implements IAddressesRepository<IAddress> {
  constructor(
    private dataServices: IDataSourcesService,
    private addressFactoryService: AddressFactoryService,
  ) {}
  getAddressesBy(
    fields: Partial<IAddress>,
    args?: IGenericArgs<IAddress>,
  ): Promise<IAddress[]> {
    throw new Error('Method not implemented.');
  }
  getOneAddressBy(
    fields: Partial<IAddress>,
    args?: IGenericArgs<IAddress>,
  ): Promise<IAddress> {
    throw new Error('Method not implemented.');
  }
  getAddressById(id: string): Promise<IAddress> {
    throw new Error('Method not implemented.');
  }
  createAddress(createAddressInput: CreateAddressInput): Promise<IAddress> {
    throw new Error('Method not implemented.');
  }
  updateAddress(
    id: string,
    updateAddressInput: UpdateAddressInput,
  ): Promise<IAddress> {
    throw new Error('Method not implemented.');
  }
  removeAddress(id: string): Promise<IAddress> {
    throw new Error('Method not implemented.');
  }
}
