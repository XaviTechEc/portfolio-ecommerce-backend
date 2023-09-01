import { Injectable } from '@nestjs/common';
import { IUserAddressRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { IUserAddress } from 'src/core/entities';
import { UserAddressFactoryService } from '../factory';
import {
  IGenericArgs,
  CreateUserAddressInput,
  UpdateUserAddressInput,
} from 'src/core/dtos';

@Injectable()
export class UserAddressUseCases
  implements IUserAddressRepository<IUserAddress>
{
  constructor(
    private dataService: IDataSourcesService,
    private userAddressFactoryService: UserAddressFactoryService,
  ) {}
  getAllUserAddress(
    args?: IGenericArgs<IUserAddress>,
  ): Promise<IUserAddress[]> {
    return this.dataService.userAddresses.getAllUserAddress(args);
  }
  getOneUserAddressById(id: string): Promise<IUserAddress> {
    return this.dataService.userAddresses.getOneUserAddressById(id);
  }
  createUserAddress(
    createUserAddressInput: CreateUserAddressInput,
  ): Promise<IUserAddress> {
    const userAddress = this.userAddressFactoryService.createUserAddress(
      createUserAddressInput,
    );
    return this.dataService.userAddresses.createUserAddress(userAddress);
  }
  updateOneUserAddressById(
    id: string,
    updateUserAddressInput: UpdateUserAddressInput,
  ): Promise<IUserAddress> {
    const userAddress = this.userAddressFactoryService.updateUserAddress(
      updateUserAddressInput,
    );
    return this.dataService.userAddresses.updateOneUserAddressById(
      id,
      userAddress,
    );
  }
  deleteOneUserAddressById(id: string): Promise<IUserAddress> {
    return this.dataService.userAddresses.deleteOneUserAddressById(id);
  }
}
