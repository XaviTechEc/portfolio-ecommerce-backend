import { MyLoggerService } from 'src/common/infrastructure/logger/logger.service';
import {
  PaginationArgs,
  IGenericArgs,
} from 'src/common/domain/dtos/graphql/args';
import { ExceptionsService } from 'src/common/infrastructure/exceptions/exceptions.service';
import { IProductCategoryRepository } from 'src/product-categories/domain/abstracts/repositories/product-category.repository';
import {
  CreateProductCategoryInput,
  UpdateProductCategoryInput,
} from 'src/product-categories/domain/dtos/graphql/inputs/product-category.input';
import {
  Repository,
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  ILike,
} from 'typeorm';
import { ProductCategory } from '../entities/ProductCategory.entity';

export class ProductCategoriesRepository
  implements IProductCategoryRepository<ProductCategory>
{
  private _repository: Repository<ProductCategory>;
  private _loggerService: MyLoggerService;
  private _exceptionsService: ExceptionsService;

  constructor(
    repository: Repository<ProductCategory>,
    loggerService: MyLoggerService,
    exceptionsService: ExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }

  async getProductCategoriesBy(
    term: string,
    fields: (keyof ProductCategory)[],
    paginationArgs: PaginationArgs,
  ): Promise<ProductCategory[]> {
    let queryOptions: FindManyOptions<ProductCategory> = {};
    let relations: FindOptionsRelations<ProductCategory> = {};
    let where: FindOptionsWhere<ProductCategory> = {};

    if (paginationArgs) {
      const { limit = 10, offset = 0 } = paginationArgs;
      queryOptions = { take: limit, skip: offset };
    }

    for (const field of fields) {
      if (field === 'category') {
        relations = { ...relations, category: true };
        where = {
          ...where,
          category: [
            { value: ILike(`%${term}%`) },
            { description: ILike(`%${term}%`) },
            { id: term },
          ],
        };
      }

      if (field === 'product') {
        relations = { ...relations, product: true };
        where = {
          ...where,
          product: [
            { title: ILike(`%${term}%`) },
            { subtitle: ILike(`%${term}%`) },
            { description: ILike(`%${term}%`) },
            { id: term },
          ],
        };
      }
    }

    queryOptions = { ...queryOptions, relations, where };

    const productCategoriesBy = await this._repository.find(queryOptions);
    return productCategoriesBy;
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
