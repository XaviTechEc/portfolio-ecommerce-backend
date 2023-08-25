import { Injectable } from '@nestjs/common';
import { IShippingMethodsRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import {
  CreateShippingMethodInput,
  UpdateShippingMethodInput,
} from 'src/core/dtos';
import { IShippingMethod } from 'src/core/entities';
import { ShippingMethodFactoryService } from './factory/shipping-method-factory.service';

@Injectable()
export class ShippingMethodUseCases implements IShippingMethodsRepository {
  constructor(
    private dataService: IDataSourcesService,
    private shippingMethodFactoryService: ShippingMethodFactoryService,
  ) {}
  getAllShippingMethods(): Promise<IShippingMethod[]> {
    return this.dataService.shippingMethods.getAll();
  }
  getShippingMethodById(id: string): Promise<IShippingMethod> {
    return this.dataService.shippingMethods.getOneById(id);
  }
  createShippingMethod(
    createShippingMethodInput: CreateShippingMethodInput,
  ): Promise<IShippingMethod> {
    const shippingMethod =
      this.shippingMethodFactoryService.createShippingMethod(
        createShippingMethodInput,
      );
    return this.dataService.shippingMethods.create(shippingMethod);
  }
  updateShippingMethod(
    id: string,
    updateShippingMethodInput: UpdateShippingMethodInput,
  ): Promise<IShippingMethod> {
    const shippingMethod =
      this.shippingMethodFactoryService.updateShippingMethod(
        updateShippingMethodInput,
      );

    return this.dataService.shippingMethods.updateOneById(id, shippingMethod);
  }
  removeShippingMethod(id: string): Promise<IShippingMethod> {
    return this.dataService.shippingMethods.deleteOneById(id);
  }
}
