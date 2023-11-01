import { Injectable } from '@nestjs/common';
import {
  IGenericArgs,
  PaginationArgs,
} from 'src/common/domain/dtos/graphql/args';
import { IUserAddressesDataSourceService } from 'src/user-addresses/domain/abstracts/services/user-addresses-datasource.abstract.service';
import {
  CreateUserAddressInput,
  UpdateUserAddressInput,
} from 'src/user-addresses/domain/dtos/graphql/inputs/user-address.input';
import { IUserAddress } from 'src/user-addresses/domain/entities/user-address.entity';
import { UserAddressFactoryService } from './factory/user-address-factory.service';

@Injectable()
export class UserAddressUseCases {
  constructor(
    private dataService: IUserAddressesDataSourceService,
    private userAddressFactoryService: UserAddressFactoryService,
  ) {}
  getUserAddressesBy(
    term: string,
    fields: (keyof IUserAddress)[],
    paginationArgs: PaginationArgs,
  ) {
    return this.dataService.userAddresses.getUserAddressesBy(
      term,
      fields,
      paginationArgs,
    );
  }
  getAllUserAddress(args?: IGenericArgs<IUserAddress>) {
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
