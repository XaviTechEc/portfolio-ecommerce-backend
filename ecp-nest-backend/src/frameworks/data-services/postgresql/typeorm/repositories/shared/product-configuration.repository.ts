import { IProductConfigurationRepository } from 'src/core/abstracts/repositories';
import { Repository } from 'typeorm';
import { ProductConfiguration } from '../../entities/outputs/entities';
import {
  IGenericArgs,
  CreateProductConfigurationInput,
  UpdateProductConfigurationInput,
} from 'src/core/dtos';
import { LoggerService } from '@nestjs/common';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';

export class ProductConfigurationsRepository
  implements IProductConfigurationRepository<ProductConfiguration>
{
  private _repository: Repository<ProductConfiguration>;
  private _loggerService: LoggerService;
  private _exceptionsService: ExceptionsService;

  constructor(
    repository: Repository<ProductConfiguration>,
    loggerService: LoggerService,
    exceptionsService: ExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }

  async getAllProductConfiguration(
    args?: IGenericArgs<ProductConfiguration>,
  ): Promise<ProductConfiguration[]> {
    let qb = this._repository.createQueryBuilder('productConfiguration');

    if (args) {
      const { paginationArgs } = args;
      if (paginationArgs) {
        const { limit = 10, offset = 0 } = paginationArgs;
        qb = qb.take(limit).skip(offset);
      }
    }

    const productConfigurations = await qb.getMany();
    return productConfigurations;
  }
  async getProductConfigurationById(id: string): Promise<ProductConfiguration> {
    const productConfigurationFound = await this._repository.findOneBy({ id });
    if (!productConfigurationFound) {
      return this._exceptionsService.notFound({
        message: `The productConfiguration with id ${id} could not be found`,
      });
    }
    return this._repository.save(productConfigurationFound);
  }
  async createProductConfiguration(
    createProductConfigurationInput: CreateProductConfigurationInput,
  ): Promise<ProductConfiguration> {
    const newProductConfiguration = this._repository.create({
      ...createProductConfigurationInput,
    });
    return newProductConfiguration;
  }
  async updateProductConfiguration(
    id: string,
    updateProductConfigurationInput: UpdateProductConfigurationInput,
  ): Promise<ProductConfiguration> {
    await this.getProductConfigurationById(id);
    const newProductConfiguration = await this._repository.preload({
      ...updateProductConfigurationInput,
    });
    if (!newProductConfiguration) {
      return this._exceptionsService.notFound({
        message: 'The ProductConfiguration could not be preloaded',
      });
    }
    return this._repository.save(newProductConfiguration);
  }
  async removeProductConfiguration(id: string): Promise<ProductConfiguration> {
    const productConfiguration = await this.getProductConfigurationById(id);
    return this._repository.remove(productConfiguration);
  }
}
