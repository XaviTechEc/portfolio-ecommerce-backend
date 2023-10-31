import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import {
  PaginationArgs,
  IGenericArgs,
} from 'src/common/domain/dtos/graphql/args';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { IProductItemsRepository } from 'src/product-items/domain/abstracts/repositories/product-item.repository';
import {
  CreateProductItemInput,
  UpdateProductItemInput,
} from 'src/product-items/domain/dtos/graphql/inputs/product-item.input';
import {
  Repository,
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  ILike,
} from 'typeorm';
import { ProductItem } from '../entities/ProductItem.entity';

const CONTEXT = 'ProductItemsRepository';

export class ProductItemsRepository
  implements IProductItemsRepository<ProductItem>
{
  private _repository: Repository<ProductItem>;
  private _loggerService: ILoggerService;
  private _exceptionsService: IExceptionsService;

  constructor(
    repository: Repository<ProductItem>,
    loggerService: ILoggerService,
    exceptionsService: IExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }
  async getProductItemsBy(
    term: string,
    fields: (keyof ProductItem)[],
    paginationArgs: PaginationArgs,
  ): Promise<ProductItem[]> {
    try {
      let queryOptions: FindManyOptions<ProductItem> = {};
      let relations: FindOptionsRelations<ProductItem> = {};
      let where: FindOptionsWhere<ProductItem> = {};

      if (paginationArgs) {
        const { limit = 10, offset = 0 } = paginationArgs;
        queryOptions = { take: limit, skip: offset };
      }

      for (const field of fields) {
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

      const productItemsBy = (await this._repository.find(queryOptions)) ?? [];
      return productItemsBy;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async getAllProductItems(
    args?: IGenericArgs<ProductItem>,
  ): Promise<ProductItem[]> {
    try {
      let qb = this._repository.createQueryBuilder('productItem');

      if (args) {
        const { paginationArgs, searchArgs } = args;
        if (paginationArgs) {
          const { limit = 10, offset = 0 } = paginationArgs;
          qb = qb.take(limit).skip(offset);
        }

        if (searchArgs) {
          const { searchTerm } = searchArgs;

          if (searchTerm) {
            qb = qb
              .where(`productItem.sku ILIKE LOWER(:sku)`)
              .orWhere('productItem.slug ILIKE LOWER(:slug)')
              .setParameters({
                sku: `%${searchTerm}%`,
                slug: `%${searchTerm}%`,
              });
          }
        }
      }

      const productItems = (await qb.getMany()) ?? [];
      return productItems;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async getProductItemById(id: string): Promise<ProductItem> {
    try {
      const productItemFound = await this._repository.findOneBy({ id });
      if (!productItemFound) {
        return this._exceptionsService.notFound({
          message: `The product item with id ${id} could not be found`,
        });
      }
      return productItemFound;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async createProductItem(
    createProductItemInput: CreateProductItemInput,
  ): Promise<ProductItem> {
    try {
      const newProductItem = this._repository.create({
        ...createProductItemInput,
      });
      return this._repository.save(newProductItem);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async updateProductItem(
    id: string,
    updateProductItemInput: UpdateProductItemInput,
  ): Promise<ProductItem> {
    try {
      await this.getProductItemById(id);
      const newProductItem = await this._repository.preload({
        ...updateProductItemInput,
      });
      return this._repository.save(newProductItem);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async removeProductItem(id: string): Promise<ProductItem> {
    try {
      const productItem = await this.getProductItemById(id);
      return this._repository.remove(productItem);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }
}
