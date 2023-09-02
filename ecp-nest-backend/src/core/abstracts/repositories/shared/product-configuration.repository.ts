import {
  CreateProductConfigurationInput,
  IGenericArgs,
  UpdateProductConfigurationInput,
} from 'src/core/dtos';

export abstract class IProductConfigurationRepository<T> {
  abstract getAllProductConfiguration(args?: IGenericArgs<T>): Promise<T[]>;
  abstract getProductConfigurationById(id: string): Promise<T>;
  abstract createProductConfiguration(
    createProductConfigurationInput: CreateProductConfigurationInput,
  ): Promise<T>;
  abstract updateProductConfiguration(
    id: string,
    updateProductConfigurationInput: UpdateProductConfigurationInput,
  ): Promise<T>;
  abstract removeProductConfiguration(id: string): Promise<T>;
}
