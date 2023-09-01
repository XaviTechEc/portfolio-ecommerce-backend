import {
  CreateProductConfigurationInput,
  IGenericArgs,
  UpdateProductConfigurationInput,
} from 'src/core/dtos';

export abstract class IProductConfigurationRepository<T> {
  abstract getAllProductConfiguration(args?: IGenericArgs<T>): Promise<T[]>;
  abstract createProductConfiguration(
    createProductConfigurationInput: CreateProductConfigurationInput,
  ): Promise<T>;
  abstract getOneProductConfigurationById(id: string): Promise<T>;
  abstract updateOneProductConfigurationById(
    updateProductConfigurationInput: UpdateProductConfigurationInput,
  ): Promise<T>;
  abstract deleteOneProductConfigurationById(id: string): Promise<T>;
}
