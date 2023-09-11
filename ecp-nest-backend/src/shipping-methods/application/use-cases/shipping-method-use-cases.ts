import { Injectable } from '@nestjs/common';
import { IDataSourcesService } from 'src/common/domain/abstracts/services';
import { IGenericArgs } from 'src/common/domain/dtos/graphql/args';
import { IShippingMethodsRepository } from 'src/shipping-methods/domain/abstracts/repositories/shipping-methods.repository';
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
