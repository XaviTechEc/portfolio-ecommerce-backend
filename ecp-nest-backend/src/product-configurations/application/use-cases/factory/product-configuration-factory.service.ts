import { Injectable } from '@nestjs/common';
import {
  CreateProductConfigurationInput,
  UpdateProductConfigurationInput,
} from 'src/core/dtos';
import { IProductConfiguration } from 'src/core/entities';

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
    return newProductConfiguration;
  }
  updateProductConfiguration(
    updateProductConfigurationInput: UpdateProductConfigurationInput,
  ) {
    const newProductConfiguration = new IProductConfiguration();
    newProductConfiguration.productItem =
      updateProductConfigurationInput.productItem;
    newProductConfiguration.variationOption =
      updateProductConfigurationInput.variationOption;
    return newProductConfiguration;
  }
}
