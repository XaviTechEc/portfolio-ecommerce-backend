import { Injectable } from '@nestjs/common';

import {
  IGenericArgs,
  PaginationArgs,
} from 'src/common/domain/dtos/graphql/args';
import { IUserPaymentMethodsRepository } from 'src/user-payment-methods/domain/abstracts/repositories/user-payment-methods.repository';
import { IUserPaymentMethodsDataSourceService } from 'src/user-payment-methods/domain/abstracts/services/user-payment-methods-datasource.abstract.service';
import {
  CreateUserPaymentMethodInput,
  UpdateUserPaymentMethodInput,
} from 'src/user-payment-methods/domain/dtos/graphql/inputs/user-payment-method.input';
import { IUserPaymentMethod } from 'src/user-payment-methods/domain/entities/user-payment-method.entity';
import { UserPaymentMethodFactoryService } from './factory/user-payment-method-factory.service';

@Injectable()
export class UserPaymentMethodUseCases
  implements IUserPaymentMethodsRepository<IUserPaymentMethod>
{
  constructor(
    private dataService: IUserPaymentMethodsDataSourceService,
    private userPaymentMethodFactoryService: UserPaymentMethodFactoryService,
  ) {}
  getUserPaymentMethodsBy(
    term: string,
    fields: (keyof IUserPaymentMethod)[],
    paginationArgs: PaginationArgs,
  ) {
    return this.dataService.userPaymentMethods.getUserPaymentMethodsBy(
      term,
      fields,
      paginationArgs,
    );
  }
  getAllUserPaymentMethods(args?: IGenericArgs<IUserPaymentMethod>) {
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
