import { Injectable } from '@nestjs/common';
import { IDataSourcesService } from 'src/common/domain/abstracts/services';
import {
  PaginationArgs,
  IGenericArgs,
} from 'src/common/domain/dtos/graphql/args';
import { IProductConfigurationRepository } from 'src/product-configurations/domain/abstracts/repositories/product-configuration.repository';
import {
  CreateProductConfigurationInput,
  UpdateProductConfigurationInput,
} from 'src/product-configurations/domain/dtos/graphql/inputs/product-configuration.input';
import { IProductConfiguration } from 'src/product-configurations/domain/entities/product-configuration.entity';
import { ProductConfigurationFactoryService } from './factory/product-configuration-factory.service';

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
