import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import {
  PaginationArgs,
  IGenericArgs,
} from 'src/common/domain/dtos/graphql/args';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { IProductConfigurationRepository } from 'src/product-configurations/domain/abstracts/repositories/product-configuration.repository';
import {
  CreateProductConfigurationInput,
  UpdateProductConfigurationInput,
} from 'src/product-configurations/domain/dtos/graphql/inputs/product-configuration.input';
import {
  Repository,
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  ILike,
} from 'typeorm';
import { ProductConfiguration } from '../entities/ProductConfiguration.entity';
import { GetAllGenericResponse } from 'src/common/domain/interfaces/responses/get-all-generic-response.interface';
import { getPageCount } from 'src/common/infrastructure/helpers/get-page-count.helper';

const CONTEXT = 'ProductConfigurationsRepository';

export class ProductConfigurationsRepository
  implements IProductConfigurationRepository<ProductConfiguration>
{
  private _repository: Repository<ProductConfiguration>;
  private _loggerService: ILoggerService;
  private _exceptionsService: IExceptionsService;

  constructor(
    repository: Repository<ProductConfiguration>,
    loggerService: ILoggerService,
    exceptionsService: IExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }
  async getProductConfigurationsBy(
    term: string,
    fields: (keyof ProductConfiguration)[],
    paginationArgs: PaginationArgs,
  ): Promise<GetAllGenericResponse<ProductConfiguration>> {
    try {
      let queryOptions: FindManyOptions<ProductConfiguration> = {};
      let relations: FindOptionsRelations<ProductConfiguration> = {};
      let where: FindOptionsWhere<ProductConfiguration> = {};
      let pageSize;

      if (paginationArgs) {
        const { limit = 10, offset = 0 } = paginationArgs;
        pageSize = limit;
        queryOptions = { take: limit, skip: offset };
      }

      for (const field of fields) {
        if (field === 'productItem') {
          relations = { ...relations, productItem: true };
          where = {
            ...where,
            productItem: [
              { sku: ILike(`%${term}%`) },
              { slug: ILike(`%${term}%`) },
              { id: term },
            ],
          };
        }

        if (field === 'variationOption') {
          relations = { ...relations, variationOption: true };
          where = {
            ...where,
            variationOption: [{ value: ILike(`%${term}%`) }, { id: term }],
          };
        }
      }

      queryOptions = { ...queryOptions, relations, where };

      const [items, total] = await this._repository.findAndCount(queryOptions);
      return { items, total, pageCount: getPageCount(total, pageSize) };
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async getAllProductConfiguration(
    args?: IGenericArgs<ProductConfiguration>,
  ): Promise<GetAllGenericResponse<ProductConfiguration>> {
    try {
      let qb = this._repository.createQueryBuilder('productConfiguration');
      let pageSize;

      if (args) {
        const { paginationArgs } = args;
        if (paginationArgs) {
          const { limit = 10, offset = 0 } = paginationArgs;
          pageSize = limit;
          qb = qb.take(limit).skip(offset);
        }
      }

      const [items, total] = await qb.getManyAndCount();
      return { items, total, pageCount: getPageCount(total, pageSize) };
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async getProductConfigurationById(id: string): Promise<ProductConfiguration> {
    try {
      const productConfigurationFound = await this._repository.findOneBy({
        id,
      });
      if (!productConfigurationFound) {
        return this._exceptionsService.notFound({
          message: `The productConfiguration with id ${id} could not be found`,
        });
      }
      return productConfigurationFound;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async createProductConfiguration(
    createProductConfigurationInput: CreateProductConfigurationInput,
  ): Promise<ProductConfiguration> {
    try {
      const newProductConfiguration = this._repository.create({
        ...createProductConfigurationInput,
      });
      return this._repository.save(newProductConfiguration);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async updateProductConfiguration(
    id: string,
    updateProductConfigurationInput: UpdateProductConfigurationInput,
  ): Promise<ProductConfiguration> {
    try {
      await this.getProductConfigurationById(id);
      const newProductConfiguration = await this._repository.preload({
        ...updateProductConfigurationInput,
      });
      return this._repository.save(newProductConfiguration);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async removeProductConfiguration(id: string): Promise<ProductConfiguration> {
    try {
      const productConfiguration = await this.getProductConfigurationById(id);
      return this._repository.remove(productConfiguration);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }
}
