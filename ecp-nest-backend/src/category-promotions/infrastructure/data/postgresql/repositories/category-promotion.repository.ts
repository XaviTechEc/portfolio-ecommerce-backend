import { ICategoryPromotionRepository } from 'src/category-promotions/domain/abstracts/repositories/category-promotion.repository';
import {
  CreateCategoryPromotionInput,
  UpdateCategoryPromotionInput,
} from 'src/category-promotions/domain/dtos/graphql/inputs/category-promotion.input';
import {
  PaginationArgs,
  IGenericArgs,
} from 'src/common/domain/dtos/graphql/args';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import {
  Repository,
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  ILike,
} from 'typeorm';
import { CategoryPromotion } from '../entities/CategoryPromotion.entity';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { GetAllGenericResponse } from 'src/common/domain/interfaces/responses/get-all-generic-response.interface';
import { getPageCount } from 'src/common/infrastructure/helpers/get-page-count.helper';

const CONTEXT = 'CategoryPromotionsRepository';

export class CategoryPromotionsRepository
  implements ICategoryPromotionRepository<CategoryPromotion>
{
  private _repository: Repository<CategoryPromotion>;
  private _loggerService: ILoggerService;
  private _exceptionsService: IExceptionsService;

  constructor(
    repository: Repository<CategoryPromotion>,
    loggerService: ILoggerService,
    exceptionsService: IExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }
  async getCategoryPromotionBy(
    term: string,
    fields: (keyof CategoryPromotion)[],
    paginationArgs: PaginationArgs,
  ): Promise<GetAllGenericResponse<CategoryPromotion>> {
    try {
      let queryOptions: FindManyOptions<CategoryPromotion> = {};
      let relations: FindOptionsRelations<CategoryPromotion> = {};
      let where: FindOptionsWhere<CategoryPromotion> = {};
      let pageSize;

      if (paginationArgs) {
        const { limit = 10, offset = 0 } = paginationArgs;
        pageSize = limit;
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

  async getAllCategoryPromotion(
    args?: IGenericArgs<CategoryPromotion>,
  ): Promise<GetAllGenericResponse<CategoryPromotion>> {
    try {
      let qb = this._repository.createQueryBuilder('categoryPromotion');
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

  async getCategoryPromotionById(id: string): Promise<CategoryPromotion> {
    try {
      const categoryPromotionFound = await this._repository.findOneBy({ id });
      if (!categoryPromotionFound) {
        return this._exceptionsService.notFound({
          message: `The categoryPromotion with id ${id} could not be found`,
        });
      }
      return categoryPromotionFound;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async createCategoryPromotion(
    createCategoryPromotionInput: CreateCategoryPromotionInput,
  ): Promise<CategoryPromotion> {
    try {
      const newCategoryPromotion = this._repository.create({
        ...createCategoryPromotionInput,
      });
      return this._repository.save(newCategoryPromotion);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async updateCategoryPromotion(
    id: string,
    updateCategoryPromotionInput: UpdateCategoryPromotionInput,
  ): Promise<CategoryPromotion> {
    try {
      await this.getCategoryPromotionById(id);
      const newCategoryPromotion = await this._repository.preload({
        ...updateCategoryPromotionInput,
      });
      return this._repository.save(newCategoryPromotion);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async removeCategoryPromotion(id: string): Promise<CategoryPromotion> {
    try {
      const categoryPromotion = await this.getCategoryPromotionById(id);
      return this._repository.remove(categoryPromotion);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }
}
