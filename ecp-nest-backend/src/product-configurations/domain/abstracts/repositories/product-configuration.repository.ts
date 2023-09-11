import {
  IGenericArgs,
  PaginationArgs,
} from 'src/common/domain/dtos/graphql/args';
import {
  CreateProductConfigurationInput,
  UpdateProductConfigurationInput,
} from '../../dtos/graphql/inputs/product-configuration.input';

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
  abstract getProductConfigurationsBy(
    term: string,
    fields: (keyof T)[],
    paginationArgs: PaginationArgs,
  ): Promise<T[]>;
}
