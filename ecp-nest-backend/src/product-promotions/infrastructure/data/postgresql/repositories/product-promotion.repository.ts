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
import { GetAllGenericResponse } from 'src/common/domain/interfaces/responses/get-all-generic-response.interface';
import { getPageCount } from 'src/common/infrastructure/helpers/get-page-count.helper';

const CONTEXT = 'ProductPromotionRepository';

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
  ): Promise<GetAllGenericResponse<ProductPromotion>> {
    try {
      let queryOptions: FindManyOptions<ProductPromotion> = {};
      let relations: FindOptionsRelations<ProductPromotion> = {};
      let where: FindOptionsWhere<ProductPromotion> = {};
      let pageSize;

      if (paginationArgs) {
        const { limit = 10, offset = 0 } = paginationArgs;
        pageSize = limit;
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

      const [items, total] = await this._repository.findAndCount(queryOptions);
      return { items, total, pageCount: getPageCount(total, pageSize) };
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async getAllProductPromotion(
    args?: IGenericArgs<ProductPromotion>,
  ): Promise<GetAllGenericResponse<ProductPromotion>> {
    try {
      let qb = this._repository.createQueryBuilder('productPromotion');
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

  async getProductPromotionById(id: string): Promise<ProductPromotion> {
    try {
      const productPromotionFound = await this._repository.findOneBy({ id });
      if (!productPromotionFound) {
        return this._exceptionsService.notFound({
          message: `The productPromotion with id ${id} could not be found`,
        });
      }
      return productPromotionFound;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async createProductPromotion(
    createProductPromotionInput: CreateProductPromotionInput,
  ): Promise<ProductPromotion> {
    try {
      const newProductPromotion = this._repository.create({
        ...createProductPromotionInput,
      });
      return this._repository.save(newProductPromotion);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async updateProductPromotion(
    id: string,
    updateProductPromotionInput: UpdateProductPromotionInput,
  ): Promise<ProductPromotion> {
    try {
      await this.getProductPromotionById(id);
      const newProductPromotion = await this._repository.preload({
        ...updateProductPromotionInput,
      });
      return this._repository.save(newProductPromotion);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async removeProductPromotion(id: string): Promise<ProductPromotion> {
    try {
      const productPromotion = await this.getProductPromotionById(id);
      return this._repository.remove(productPromotion);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }
}
