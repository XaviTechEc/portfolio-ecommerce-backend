import { IUserAddressRepository } from 'src/core/abstracts/repositories';
import { Repository } from 'typeorm';
import { UserAddress } from '../../entities/outputs/entities';
import {
  IGenericArgs,
  CreateUserAddressInput,
  UpdateUserAddressInput,
} from 'src/core/dtos';

export class UserAddressesRepository
  implements IUserAddressRepository<UserAddress>
{
  private _repository: Repository<UserAddress>;

  constructor(repository: Repository<UserAddress>) {
    this._repository = repository;
  }
  getAllUserAddress(args?: IGenericArgs<UserAddress>): Promise<UserAddress[]> {
    throw new Error('Method not implemented.');
  }
  getUserAddressById(id: string): Promise<UserAddress> {
    throw new Error('Method not implemented.');
  }
  createUserAddress(
    createUserAddressInput: CreateUserAddressInput,
  ): Promise<UserAddress> {
    throw new Error('Method not implemented.');
  }
  updateUserAddress(
    id: string,
    updateUserAddressInput: UpdateUserAddressInput,
  ): Promise<UserAddress> {
    throw new Error('Method not implemented.');
  }
  removeUserAddress(id: string): Promise<UserAddress> {
    throw new Error('Method not implemented.');
  }
}
