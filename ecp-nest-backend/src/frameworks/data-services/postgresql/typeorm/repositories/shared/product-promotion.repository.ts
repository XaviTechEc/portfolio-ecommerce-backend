import { IProductPromotionRepository } from 'src/core/abstracts/repositories';
import {
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  ILike,
  Repository,
} from 'typeorm';
import { ProductPromotion } from '../../entities/outputs/entities';
import {
  IGenericArgs,
  CreateProductPromotionInput,
  UpdateProductPromotionInput,
  PaginationArgs,
} from 'src/core/dtos';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';
import { LoggerService } from 'src/infrastructure/logger/logger.service';

export class ProductPromotionsRepository
  implements IProductPromotionRepository<ProductPromotion>
{
  private _repository: Repository<ProductPromotion>;
  private _loggerService: LoggerService;
  private _exceptionsService: ExceptionsService;

  constructor(
    repository: Repository<ProductPromotion>,
    loggerService: LoggerService,
    exceptionsService: ExceptionsService,
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
