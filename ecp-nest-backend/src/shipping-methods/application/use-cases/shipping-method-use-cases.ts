import { Injectable } from '@nestjs/common';
import { IGenericArgs } from 'src/common/domain/dtos/graphql/args';
import { IShippingMethodsRepository } from 'src/shipping-methods/domain/abstracts/repositories/shipping-methods.repository';
import { IShippingMethodsDataSourceService } from 'src/shipping-methods/domain/abstracts/services/shipping-methods-datasource.abstract.service';
import {
  CreateShippingMethodInput,
  UpdateShippingMethodInput,
} from 'src/shipping-methods/domain/dtos/graphql/inputs/shipping-method.input';
import { IShippingMethod } from 'src/shipping-methods/domain/entities/shipping-method.entity';
import { ShippingMethodFactoryService } from './factory/shipping-method-factory.service';

@Injectable()
export class ShippingMethodUseCases
  implements IShippingMethodsRepository<IShippingMethod>
{
  constructor(
    private dataService: IShippingMethodsDataSourceService,
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
