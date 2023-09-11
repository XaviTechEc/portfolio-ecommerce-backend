import { Injectable } from '@nestjs/common';
import { IDataSourcesService } from 'src/common/domain/abstracts/services';
import {
  PaginationArgs,
  IGenericArgs,
} from 'src/common/domain/dtos/graphql/args';
import { IUserAddressRepository } from 'src/user-addresses/domain/abstracts/repositories/user-address.repository';
import {
  CreateUserAddressInput,
  UpdateUserAddressInput,
} from 'src/user-addresses/domain/dtos/graphql/inputs/user-address.input';
import { IUserAddress } from 'src/user-addresses/domain/entities/user-address.entity';
import { UserAddressFactoryService } from './factory/user-address-factory.service';

@Injectable()
export class UserAddressUseCases
  implements IUserAddressRepository<IUserAddress>
{
  constructor(
    private dataService: IDataSourcesService,
    private userAddressFactoryService: UserAddressFactoryService,
  ) {}
  getUserAddressesBy(
    term: string,
    fields: (keyof IUserAddress)[],
    paginationArgs: PaginationArgs,
  ): Promise<IUserAddress[]> {
    return this.dataService.userAddresses.getUserAddressesBy(
      term,
      fields,
      paginationArgs,
    );
  }
  getAllUserAddress(
    args?: IGenericArgs<IUserAddress>,
  ): Promise<IUserAddress[]> {
    return this.dataService.userAddresses.getAllUserAddress(args);
  }
  getUserAddressById(id: string): Promise<IUserAddress> {
    return this.dataService.userAddresses.getUserAddressById(id);
  }
  createUserAddress(
    createUserAddressInput: CreateUserAddressInput,
  ): Promise<IUserAddress> {
    const userAddress = this.userAddressFactoryService.createUserAddress(
      createUserAddressInput,
    );
    return this.dataService.userAddresses.createUserAddress(userAddress);
  }
  updateUserAddress(
    id: string,
    updateUserAddressInput: UpdateUserAddressInput,
  ): Promise<IUserAddress> {
    const userAddress = this.userAddressFactoryService.updateUserAddress(
      updateUserAddressInput,
    );
    return this.dataService.userAddresses.updateUserAddress(id, userAddress);
  }
  removeUserAddress(id: string): Promise<IUserAddress> {
    return this.dataService.userAddresses.removeUserAddress(id);
  }
}
