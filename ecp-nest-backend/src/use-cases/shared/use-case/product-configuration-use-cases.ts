import { Injectable } from '@nestjs/common';
import { IProductConfigurationRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { IProductConfiguration } from 'src/core/entities';
import { ProductConfigurationFactoryService } from '../factory';
import {
  IGenericArgs,
  CreateProductConfigurationInput,
  UpdateProductConfigurationInput,
} from 'src/core/dtos';

@Injectable()
export class ProductConfigurationUseCases
  implements IProductConfigurationRepository<IProductConfiguration>
{
  constructor(
    private dataService: IDataSourcesService,
    private productConfigurationFactoryService: ProductConfigurationFactoryService,
  ) {}
  getAllProductConfiguration(
    args?: IGenericArgs<IProductConfiguration>,
  ): Promise<IProductConfiguration[]> {
    return this.dataService.productConfigurations.getAllProductConfiguration(
      args,
    );
  }
  getOneProductConfigurationById(id: string): Promise<IProductConfiguration> {
    return this.dataService.productConfigurations.getOneProductConfigurationById(
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
  updateOneProductConfigurationById(
    id: string,
    updateProductConfigurationInput: UpdateProductConfigurationInput,
  ): Promise<IProductConfiguration> {
    const productConfiguration =
      this.productConfigurationFactoryService.updateProductConfiguration(
        updateProductConfigurationInput,
      );
    return this.dataService.productConfigurations.updateOneProductConfigurationById(
      id,
      productConfiguration,
    );
  }
  deleteOneProductConfigurationById(
    id: string,
  ): Promise<IProductConfiguration> {
    return this.dataService.productConfigurations.deleteOneProductConfigurationById(
      id,
    );
  }
}
