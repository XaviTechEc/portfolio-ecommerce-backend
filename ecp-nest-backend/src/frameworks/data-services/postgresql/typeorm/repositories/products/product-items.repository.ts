import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';
import { IProductItemsRepository } from 'src/core/abstracts/repositories';
import { CreateProductItemInput, UpdateProductItemInput } from 'src/core/dtos';
import { Repository } from 'typeorm';
import { ProductItem } from '../../entities/outputs/entities';
import { LoggerService } from '@nestjs/common';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';

export class ProductItemsRepository
  implements IProductItemsRepository<ProductItem>
{
  private _repository: Repository<ProductItem>;
  private _loggerService: LoggerService;
  private _exceptionsService: ExceptionsService;

  constructor(
    repository: Repository<ProductItem>,
    loggerService: LoggerService,
    exceptionsService: ExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
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

  async getAllProductItemsBy(
    fields: Partial<ProductItem>,
    args?: IGenericArgs<ProductItem>,
  ): Promise<ProductItem[]> {
    throw new Error('Method not implemented.');
  }

  async getOneProductItemBy(
    fields: Partial<ProductItem>,
    args?: IGenericArgs<ProductItem>,
  ): Promise<ProductItem> {
    throw new Error('Method not implemented.');
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
