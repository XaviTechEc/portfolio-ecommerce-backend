import { IGenericArgs } from 'src/core/abstracts/generic-args.repository';
import { IAddressesRepository } from 'src/core/abstracts/repositories';
import { CreateAddressInput, UpdateAddressInput } from 'src/core/dtos';
import { Repository } from 'typeorm';

export class AddressesRepository<T> implements IAddressesRepository<T> {
  private _repository: Repository<T>;
  constructor(repository: Repository<T>) {
    this._repository = repository;
  }

  getAddressesBy(fields: Partial<T>, args?: IGenericArgs<T>): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  getOneAddressBy(fields: Partial<T>, args?: IGenericArgs<T>): Promise<T> {
    throw new Error('Method not implemented.');
  }
  getAddressById(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
  createAddress(createAddressInput: CreateAddressInput): Promise<T> {
    throw new Error('Method not implemented.');
  }
  updateAddress(
    id: string,
    updateAddressInput: UpdateAddressInput,
  ): Promise<T> {
    throw new Error('Method not implemented.');
  }
  removeAddress(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
}
