import { Injectable } from '@nestjs/common';
import {
  CreateProductConfigurationInput,
  UpdateProductConfigurationInput,
} from 'src/product-configurations/domain/dtos/graphql/inputs/product-configuration.input';
import { IProductConfiguration } from 'src/product-configurations/domain/entities/product-configuration.entity';

@Injectable()
export class ProductConfigurationFactoryService {
  createProductConfiguration(
    createProductConfigurationInput: CreateProductConfigurationInput,
  ) {
    const newProductConfiguration = new IProductConfiguration();
    newProductConfiguration.productItem =
      createProductConfigurationInput.productItem;
    newProductConfiguration.variationOption =
      createProductConfigurationInput.variationOption;
    newProductConfiguration.active = createProductConfigurationInput.active;
    return newProductConfiguration;
  }
  updateProductConfiguration(
    updateProductConfigurationInput: UpdateProductConfigurationInput,
  ) {
    const newProductConfiguration = new IProductConfiguration();
    newProductConfiguration.id = updateProductConfigurationInput.id;
    newProductConfiguration.productItem =
      updateProductConfigurationInput.productItem;
    newProductConfiguration.variationOption =
      updateProductConfigurationInput.variationOption;
    newProductConfiguration.active = updateProductConfigurationInput.active;
    return newProductConfiguration;
  }
}
