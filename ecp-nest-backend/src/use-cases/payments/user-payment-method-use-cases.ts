import { Injectable } from '@nestjs/common';
import { IUserPaymentMethodsRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import {
  CreateUserPaymentMethodDto,
  UpdateUserPaymentMethodDto,
} from 'src/core/dtos';
import { IUserPaymentMethod } from 'src/core/entities';
import { UserPaymentMethodFactoryService } from './factory/user-payment-method-factory.service';
import { IGenericArgs } from 'src/core/abstracts/generic-args.repository';

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
    throw new Error('Method not implemented.');
  }
  getAllUserPaymentMethodsBy(
    fields: Partial<IUserPaymentMethod>,
    args?: IGenericArgs<IUserPaymentMethod>,
  ): Promise<IUserPaymentMethod[]> {
    throw new Error('Method not implemented.');
  }
  getOneUserPaymentMethodBy(
    fields: Partial<IUserPaymentMethod>,
    args?: IGenericArgs<IUserPaymentMethod>,
  ): Promise<IUserPaymentMethod> {
    throw new Error('Method not implemented.');
  }
  getUserPaymentMethodById(id: string): Promise<IUserPaymentMethod> {
    throw new Error('Method not implemented.');
  }
  createUserPaymentMethod(
    createUserPaymentMethodInput: CreateUserPaymentMethodDto,
  ): Promise<IUserPaymentMethod> {
    throw new Error('Method not implemented.');
  }
  updateUserPaymentMethod(
    id: string,
    updateUserPaymentMethodInput: UpdateUserPaymentMethodDto,
  ): Promise<IUserPaymentMethod> {
    throw new Error('Method not implemented.');
  }
  removeUserPaymentMethod(id: string): Promise<IUserPaymentMethod> {
    throw new Error('Method not implemented.');
  }
}
