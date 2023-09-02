import { IProductConfigurationRepository } from 'src/core/abstracts/repositories';
import { Repository } from 'typeorm';
import { ProductConfiguration } from '../../entities/outputs/entities';
import {
  IGenericArgs,
  CreateProductConfigurationInput,
  UpdateProductConfigurationInput,
} from 'src/core/dtos';

export class ProductConfigurationsRepository
  implements IProductConfigurationRepository<ProductConfiguration>
{
  private _repository: Repository<ProductConfiguration>;

  constructor(repository: Repository<ProductConfiguration>) {
    this._repository = repository;
  }
  getAllProductConfiguration(
    args?: IGenericArgs<ProductConfiguration>,
  ): Promise<ProductConfiguration[]> {
    throw new Error('Method not implemented.');
  }
  getProductConfigurationById(id: string): Promise<ProductConfiguration> {
    throw new Error('Method not implemented.');
  }
  createProductConfiguration(
    createProductConfigurationInput: CreateProductConfigurationInput,
  ): Promise<ProductConfiguration> {
    throw new Error('Method not implemented.');
  }
  updateProductConfiguration(
    id: string,
    updateProductConfigurationInput: UpdateProductConfigurationInput,
  ): Promise<ProductConfiguration> {
    throw new Error('Method not implemented.');
  }
  removeProductConfiguration(id: string): Promise<ProductConfiguration> {
    throw new Error('Method not implemented.');
  }
}
