import { Injectable } from '@nestjs/common';
import { IUserPaymentMethodsRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import {
  CreateUserPaymentMethodDto,
  UpdateUserPaymentMethodDto,
} from 'src/core/dtos';
import { IUserPaymentMethod } from 'src/core/entities';
import { UserPaymentMethodFactoryService } from './factory/user-payment-method-factory.service';

@Injectable()
export class UserPaymentMethodUseCases
  implements IUserPaymentMethodsRepository
{
  constructor(
    private dataService: IDataSourcesService,
    private userPaymentMethodFactoryService: UserPaymentMethodFactoryService,
  ) {}
  getAllUserPaymentMethods(): Promise<IUserPaymentMethod[]> {
    return this.dataService.userPaymentMethods.getAll();
  }
  getAllUserPaymentMethodsBy(
    fields: Partial<IUserPaymentMethod>,
  ): Promise<IUserPaymentMethod[]> {
    return this.dataService.userPaymentMethods.getAllBy(fields);
  }
  getOneUserPaymentMethodBy(
    fields: Partial<IUserPaymentMethod>,
  ): Promise<IUserPaymentMethod> {
    return this.dataService.userPaymentMethods.getOneBy(fields);
  }
  createUserPaymentMethod(
    createUserPaymentMethodInput: CreateUserPaymentMethodDto,
  ): Promise<IUserPaymentMethod> {
    const userPaymentMethod =
      this.userPaymentMethodFactoryService.createUserPaymentMethod(
        createUserPaymentMethodInput,
      );
    return this.dataService.userPaymentMethods.create(userPaymentMethod);
  }
  updateUserPaymentMethod(
    id: string,
    updateUserPaymentMethodInput: UpdateUserPaymentMethodDto,
  ): Promise<IUserPaymentMethod> {
    const userPaymentMethod =
      this.userPaymentMethodFactoryService.updateUserPaymentMethod(
        updateUserPaymentMethodInput,
      );
    return this.dataService.userPaymentMethods.updateOneById(
      id,
      userPaymentMethod,
    );
  }
  removeUserPaymentMethod(id: string): Promise<IUserPaymentMethod> {
    return this.dataService.userPaymentMethods.deleteOneById(id);
  }
}
