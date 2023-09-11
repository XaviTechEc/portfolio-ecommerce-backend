import { Injectable } from '@nestjs/common';
import { IUserPaymentMethodsRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-services/data-sources.service';
import {
  IGenericArgs,
  CreateUserPaymentMethodInput,
  UpdateUserPaymentMethodInput,
  PaginationArgs,
} from 'src/core/dtos';
import { IUserPaymentMethod } from 'src/core/entities';
import { UserPaymentMethodFactoryService } from './factory';

@Injectable()
export class UserPaymentMethodUseCases
  implements IUserPaymentMethodsRepository<IUserPaymentMethod>
{
  constructor(
    private dataService: IDataSourcesService,
    private userPaymentMethodFactoryService: UserPaymentMethodFactoryService,
  ) {}
  getUserPaymentMethodsBy(
    term: string,
    fields: (keyof IUserPaymentMethod)[],
    paginationArgs: PaginationArgs,
  ): Promise<IUserPaymentMethod[]> {
    return this.dataService.userPaymentMethods.getUserPaymentMethodsBy(
      term,
      fields,
      paginationArgs,
    );
  }
  getAllUserPaymentMethods(
    args?: IGenericArgs<IUserPaymentMethod>,
  ): Promise<IUserPaymentMethod[]> {
    return this.dataService.userPaymentMethods.getAllUserPaymentMethods(args);
  }
  getUserPaymentMethodById(id: string): Promise<IUserPaymentMethod> {
    return this.dataService.userPaymentMethods.getUserPaymentMethodById(id);
  }
  createUserPaymentMethod(
    createUserPaymentMethodInput: CreateUserPaymentMethodInput,
  ): Promise<IUserPaymentMethod> {
    const upm = this.userPaymentMethodFactoryService.createUserPaymentMethod(
      createUserPaymentMethodInput,
    );
    return this.dataService.userPaymentMethods.createUserPaymentMethod(upm);
  }
  updateUserPaymentMethod(
    id: string,
    updateUserPaymentMethodInput: UpdateUserPaymentMethodInput,
  ): Promise<IUserPaymentMethod> {
    const upm = this.userPaymentMethodFactoryService.updateUserPaymentMethod(
      updateUserPaymentMethodInput,
    );
    return this.dataService.userPaymentMethods.updateUserPaymentMethod(id, upm);
  }
  removeUserPaymentMethod(id: string): Promise<IUserPaymentMethod> {
    return this.dataService.userPaymentMethods.removeUserPaymentMethod(id);
  }
}
