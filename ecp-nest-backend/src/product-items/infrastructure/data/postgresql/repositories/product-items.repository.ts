import { MyLoggerService } from 'src/common/infrastructure/logger/logger.service';
import {
  PaginationArgs,
  IGenericArgs,
} from 'src/common/domain/dtos/graphql/args';
import { ExceptionsService } from 'src/common/infrastructure/exceptions/exceptions.service';
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

export class ProductItemsRepository
  implements IProductItemsRepository<ProductItem>
{
  private _repository: Repository<ProductItem>;
  private _loggerService: MyLoggerService;
  private _exceptionsService: ExceptionsService;

  constructor(
    repository: Repository<ProductItem>,
    loggerService: MyLoggerService,
    exceptionsService: ExceptionsService,
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

    const productItemsBy = await this._repository.find(queryOptions);
    return productItemsBy;
  }

  async getAllProductItems(
    args?: IGenericArgs<ProductItem>,
  ): Promise<ProductItem[]> {
    let qb = this._repository.createQueryBuilder('productItem');

    if (args) {
      const { paginationArgs, searchArgs } = args;
      if (paginationArgs) {
        const { limit = 10, offset = 0 } = paginationArgs;
        qb = qb.take(limit).skip(offset);
      }

      if (searchArgs) {
        const { searchTerm } = searchArgs;

        qb = qb
          .where(`productItem.sku ILIKE LOWER(:sku)`)
          .orWhere('productItem.slug ILIKE LOWER(:slug)')
          .setParameters({
            sku: `%${searchTerm}%`,
            slug: `%${searchTerm}%`,
          });
      }
    }

    const productItems = await qb.getMany();
    return productItems;
  }

  async getProductItemById(id: string): Promise<ProductItem> {
    const productItemFound = await this._repository.findOneBy({ id });
    return this._repository.save(productItemFound);
  }

  async createProductItem(
    createProductItemInput: CreateProductItemInput,
  ): Promise<ProductItem> {
    const newProductItem = this._repository.create({
      ...createProductItemInput,
    });
    return newProductItem;
  }

  async updateProductItem(
    id: string,
    updateProductItemInput: UpdateProductItemInput,
  ): Promise<ProductItem> {
    await this.getProductItemById(id);
    const newProductItem = await this._repository.preload({
      ...updateProductItemInput,
    });
    if (!newProductItem) {
      return this._exceptionsService.notFound({
        message: 'The product item could not be preloaded',
      });
    }
    return this._repository.save(newProductItem);
  }

  async removeProductItem(id: string): Promise<ProductItem> {
    const productItem = await this.getProductItemById(id);
    return this._repository.remove(productItem);
  }
}
