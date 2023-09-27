import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import {
  PaginationArgs,
  IGenericArgs,
} from 'src/common/domain/dtos/graphql/args';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { IProductPromotionRepository } from 'src/product-promotions/domain/abstracts/repositories/product-promotion.repository';
import {
  CreateProductPromotionInput,
  UpdateProductPromotionInput,
} from 'src/product-promotions/domain/dtos/graphql/inputs/product-promotion.input';
import {
  Repository,
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  ILike,
} from 'typeorm';
import { ProductPromotion } from '../entities/ProductPromotion.entity';

export class ProductPromotionsRepository
  implements IProductPromotionRepository<ProductPromotion>
{
  private _repository: Repository<ProductPromotion>;
  private _loggerService: ILoggerService;
  private _exceptionsService: IExceptionsService;

  constructor(
    repository: Repository<ProductPromotion>,
    loggerService: ILoggerService,
    exceptionsService: IExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }
  async getProductPromotionsBy(
    term: string,
    fields: (keyof ProductPromotion)[],
    paginationArgs: PaginationArgs,
  ): Promise<ProductPromotion[]> {
    let queryOptions: FindManyOptions<ProductPromotion> = {};
    let relations: FindOptionsRelations<ProductPromotion> = {};
    let where: FindOptionsWhere<ProductPromotion> = {};

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

      if (field === 'promotion') {
        relations = { ...relations, promotion: true };
        where = {
          ...where,
          promotion: [{ description: ILike(`%${term}%`) }, { id: term }],
        };
      }
    }

    queryOptions = { ...queryOptions, relations, where };

    const productPromotionsBy = await this._repository.find(queryOptions);
    return productPromotionsBy;
  }

  async getAllProductPromotion(
    args?: IGenericArgs<ProductPromotion>,
  ): Promise<ProductPromotion[]> {
    let qb = this._repository.createQueryBuilder('productPromotion');

    if (args) {
      const { paginationArgs } = args;
      if (paginationArgs) {
        const { limit = 10, offset = 0 } = paginationArgs;
        qb = qb.take(limit).skip(offset);
      }
    }

    const productPromotions = await qb.getMany();
    return productPromotions;
  }

  async getProductPromotionById(id: string): Promise<ProductPromotion> {
    const productPromotionFound = await this._repository.findOneBy({ id });
    if (!productPromotionFound) {
      return this._exceptionsService.notFound({
        message: `The productPromotion with id ${id} could not be found`,
      });
    }
    return this._repository.save(productPromotionFound);
  }

  async createProductPromotion(
    createProductPromotionInput: CreateProductPromotionInput,
  ): Promise<ProductPromotion> {
    const newProductPromotion = this._repository.create({
      ...createProductPromotionInput,
    });
    return newProductPromotion;
  }

  async updateProductPromotion(
    id: string,
    updateProductPromotionInput: UpdateProductPromotionInput,
  ): Promise<ProductPromotion> {
    await this.getProductPromotionById(id);
    const newProductPromotion = await this._repository.preload({
      ...updateProductPromotionInput,
    });
    if (!newProductPromotion) {
      return this._exceptionsService.notFound({
        message: 'The ProductPromotion could not be preloaded',
      });
    }
    return this._repository.save(newProductPromotion);
  }

  async removeProductPromotion(id: string): Promise<ProductPromotion> {
    const productPromotion = await this.getProductPromotionById(id);
    return this._repository.remove(productPromotion);
  }
}
