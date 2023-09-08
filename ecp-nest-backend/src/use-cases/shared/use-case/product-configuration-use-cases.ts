import { Injectable } from '@nestjs/common';
import { IProductConfigurationRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-services/data-sources.service';
import { IProductConfiguration } from 'src/core/entities';
import { ProductConfigurationFactoryService } from '../factory';
import {
  IGenericArgs,
  CreateProductConfigurationInput,
  UpdateProductConfigurationInput,
  PaginationArgs,
} from 'src/core/dtos';

@Injectable()
export class ProductConfigurationUseCases
  implements IProductConfigurationRepository<IProductConfiguration>
{
  constructor(
    private dataService: IDataSourcesService,
    private productConfigurationFactoryService: ProductConfigurationFactoryService,
  ) {}
  getProductConfigurationsBy(
    term: string,
    fields: (keyof IProductConfiguration)[],
    paginationArgs: PaginationArgs,
  ): Promise<IProductConfiguration[]> {
    return this.dataService.productConfigurations.getProductConfigurationsBy(
      term,
      fields,
      paginationArgs,
    );
  }
  getAllProductConfiguration(
    args?: IGenericArgs<IProductConfiguration>,
  ): Promise<IProductConfiguration[]> {
    return this.dataService.productConfigurations.getAllProductConfiguration(
      args,
    );
  }
  getProductConfigurationById(id: string): Promise<IProductConfiguration> {
    return this.dataService.productConfigurations.getProductConfigurationById(
      id,
    );
  }
  createProductConfiguration(
    createProductConfigurationInput: CreateProductConfigurationInput,
  ): Promise<IProductConfiguration> {
    const productConfiguration =
      this.productConfigurationFactoryService.createProductConfiguration(
        createProductConfigurationInput,
      );
    return this.dataService.productConfigurations.createProductConfiguration(
      productConfiguration,
    );
  }
  updateProductConfiguration(
    id: string,
    updateProductConfigurationInput: UpdateProductConfigurationInput,
  ): Promise<IProductConfiguration> {
    const productConfiguration =
      this.productConfigurationFactoryService.updateProductConfiguration(
        updateProductConfigurationInput,
      );
    return this.dataService.productConfigurations.updateProductConfiguration(
      id,
      productConfiguration,
    );
  }
  removeProductConfiguration(id: string): Promise<IProductConfiguration> {
    return this.dataService.productConfigurations.removeProductConfiguration(
      id,
    );
  }
}
