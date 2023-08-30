import { Injectable } from '@nestjs/common';
import { IShippingMethodsRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import {
  CreateShippingMethodInput,
  UpdateShippingMethodInput,
} from 'src/core/dtos';
import { IShippingMethod } from 'src/core/entities';
import { ShippingMethodFactoryService } from './factory/shipping-method-factory.service';
import { IGenericArgs } from 'src/core/abstracts/generic-args.repository';

@Injectable()
export class ShippingMethodUseCases
  implements IShippingMethodsRepository<IShippingMethod>
{
  constructor(
    private dataService: IDataSourcesService,
    private shippingMethodFactoryService: ShippingMethodFactoryService,
  ) {}
  getAllShippingMethods(
    args?: IGenericArgs<IShippingMethod>,
  ): Promise<IShippingMethod[]> {
    throw new Error('Method not implemented.');
  }
  getShippingMethodById(id: string): Promise<IShippingMethod> {
    throw new Error('Method not implemented.');
  }
  createShippingMethod(
    createShippingMethodInput: CreateShippingMethodInput,
  ): Promise<IShippingMethod> {
    throw new Error('Method not implemented.');
  }
  updateShippingMethod(
    id: string,
    updateShippingMethodInput: UpdateShippingMethodInput,
  ): Promise<IShippingMethod> {
    throw new Error('Method not implemented.');
  }
  removeShippingMethod(id: string): Promise<IShippingMethod> {
    throw new Error('Method not implemented.');
  }
}
