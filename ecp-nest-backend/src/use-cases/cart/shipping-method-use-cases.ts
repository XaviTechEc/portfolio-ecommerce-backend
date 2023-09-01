import { Injectable } from '@nestjs/common';
import { IShippingMethodsRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import {
  CreateShippingMethodInput,
  UpdateShippingMethodInput,
} from 'src/core/dtos';
import { IShippingMethod } from 'src/core/entities';
import { ShippingMethodFactoryService } from './factory/shipping-method-factory.service';
import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';

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
    return this.dataService.shippingMethods.getAllShippingMethods(args);
  }
  getShippingMethodById(id: string): Promise<IShippingMethod> {
    return this.dataService.shippingMethods.getShippingMethodById(id);
  }
  createShippingMethod(
    createShippingMethodInput: CreateShippingMethodInput,
  ): Promise<IShippingMethod> {
    const shippingMethod =
      this.shippingMethodFactoryService.createShippingMethod(
        createShippingMethodInput,
      );
    return this.dataService.shippingMethods.createShippingMethod(
      shippingMethod,
    );
  }
  updateShippingMethod(
    id: string,
    updateShippingMethodInput: UpdateShippingMethodInput,
  ): Promise<IShippingMethod> {
    const shippingMethod =
      this.shippingMethodFactoryService.updateShippingMethod(
        updateShippingMethodInput,
      );
    return this.dataService.shippingMethods.updateShippingMethod(
      id,
      shippingMethod,
    );
  }
  removeShippingMethod(id: string): Promise<IShippingMethod> {
    return this.dataService.shippingMethods.removeShippingMethod(id);
  }
}
