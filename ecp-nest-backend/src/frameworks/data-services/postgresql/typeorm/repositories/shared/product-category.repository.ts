import { IProductCategoryRepository } from 'src/core/abstracts/repositories';
import { Repository } from 'typeorm';
import { ProductCategory } from '../../entities/outputs/entities';
import {
  IGenericArgs,
  CreateProductCategoryInput,
  UpdateProductCategoryInput,
} from 'src/core/dtos';
import { LoggerService } from '@nestjs/common';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';

export class ProductCategoriesRepository
  implements IProductCategoryRepository<ProductCategory>
{
  private _repository: Repository<ProductCategory>;
  private _loggerService: LoggerService;
  private _exceptionsService: ExceptionsService;

  constructor(
    repository: Repository<ProductCategory>,
    loggerService: LoggerService,
    exceptionsService: ExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }

  async getAllProductCategory(
    args?: IGenericArgs<ProductCategory>,
  ): Promise<ProductCategory[]> {
    let qb = this._repository.createQueryBuilder('productCategory');

    if (args) {
      const { paginationArgs } = args;
      if (paginationArgs) {
        const { limit = 10, offset = 0 } = paginationArgs;
        qb = qb.take(limit).skip(offset);
      }
    }

    const productCategories = await qb.getMany();
    return productCategories;
  }
  async getProductCategoryById(id: string): Promise<ProductCategory> {
    const productCategoryFound = await this._repository.findOneBy({ id });
    if (!productCategoryFound) {
      return this._exceptionsService.notFound({
        message: `The productCategory with id ${id} could not be found`,
      });
    }
    return this._repository.save(productCategoryFound);
  }
  async createProductCategory(
    createProductCategoryInput: CreateProductCategoryInput,
  ): Promise<ProductCategory> {
    const newProductCategory = this._repository.create({
      ...createProductCategoryInput,
    });
    return newProductCategory;
  }
  async updateProductCategory(
    id: string,
    updateProductCategoryInput: UpdateProductCategoryInput,
  ): Promise<ProductCategory> {
    await this.getProductCategoryById(id);
    const newProductCategory = await this._repository.preload({
      ...updateProductCategoryInput,
    });
    if (!newProductCategory) {
      return this._exceptionsService.notFound({
        message: 'The ProductCategory could not be preloaded',
      });
    }
    return this._repository.save(newProductCategory);
  }
  async removeProductCategory(id: string): Promise<ProductCategory> {
    const productCategory = await this.getProductCategoryById(id);
    return this._repository.remove(productCategory);
  }
}
