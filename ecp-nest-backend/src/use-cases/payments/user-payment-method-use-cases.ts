import { Injectable } from '@nestjs/common';
import { IUserPaymentMethodsRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import {
  IGenericArgs,
  CreateUserPaymentMethodInput,
  UpdateUserPaymentMethodInput,
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
  getAllUserPaymentMethods(
    args?: IGenericArgs<IUserPaymentMethod>,
  ): Promise<IUserPaymentMethod[]> {
    return this.dataService.userPaymentMethods.getAllUserPaymentMethods(args);
  }
  getAllUserPaymentMethodsBy(
    fields: Partial<IUserPaymentMethod>,
    args?: IGenericArgs<IUserPaymentMethod>,
  ): Promise<IUserPaymentMethod[]> {
    return this.dataService.userPaymentMethods.getAllUserPaymentMethodsBy(
      fields,
      args,
    );
  }
  getOneUserPaymentMethodBy(
    fields: Partial<IUserPaymentMethod>,
    args?: IGenericArgs<IUserPaymentMethod>,
  ): Promise<IUserPaymentMethod> {
    return this.dataService.userPaymentMethods.getOneUserPaymentMethodBy(
      fields,
      args,
    );
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
