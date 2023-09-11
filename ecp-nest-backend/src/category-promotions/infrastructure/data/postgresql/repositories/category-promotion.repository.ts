import { ICategoryPromotionRepository } from 'src/category-promotions/domain/abstracts/repositories/category-promotion.repository';
import {
  CreateCategoryPromotionInput,
  UpdateCategoryPromotionInput,
} from 'src/category-promotions/domain/dtos/graphql/inputs/category-promotion.input';
import {
  PaginationArgs,
  IGenericArgs,
} from 'src/common/domain/dtos/graphql/args';
import { ExceptionsService } from 'src/common/infrastructure/exceptions/exceptions.service';
import {
  Repository,
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  ILike,
} from 'typeorm';
import { CategoryPromotion } from '../entities/CategoryPromotion.entity';
import { MyLoggerService } from 'src/common/infrastructure/logger/logger.service';

export class CategoryPromotionsRepository
  implements ICategoryPromotionRepository<CategoryPromotion>
{
  private _repository: Repository<CategoryPromotion>;
  private _loggerService: MyLoggerService;
  private _exceptionsService: ExceptionsService;

  constructor(
    repository: Repository<CategoryPromotion>,
    loggerService: MyLoggerService,
    exceptionsService: ExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }
  async getCategoryPromotionBy(
    term: string,
    fields: (keyof CategoryPromotion)[],
    paginationArgs: PaginationArgs,
  ): Promise<CategoryPromotion[]> {
    let queryOptions: FindManyOptions<CategoryPromotion> = {};
    let relations: FindOptionsRelations<CategoryPromotion> = {};
    let where: FindOptionsWhere<CategoryPromotion> = {};

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

      if (field === 'promotion') {
        relations = { ...relations, promotion: true };
        where = {
          ...where,
          promotion: [{ description: ILike(`%${term}%`) }, { id: term }],
        };
      }
    }

    queryOptions = { ...queryOptions, relations, where };

    const categoryPromotionsBy = await this._repository.find(queryOptions);
    return categoryPromotionsBy;
  }

  async getAllCategoryPromotion(
    args?: IGenericArgs<CategoryPromotion>,
  ): Promise<CategoryPromotion[]> {
    let qb = this._repository.createQueryBuilder('categoryPromotion');

    if (args) {
      const { paginationArgs } = args;
      if (paginationArgs) {
        const { limit = 10, offset = 0 } = paginationArgs;
        qb = qb.take(limit).skip(offset);
      }
    }

    const categoryPromotions = await qb.getMany();
    return categoryPromotions;
  }

  async getCategoryPromotionById(id: string): Promise<CategoryPromotion> {
    const categoryPromotionFound = await this._repository.findOneBy({ id });
    if (!categoryPromotionFound) {
      return this._exceptionsService.notFound({
        message: `The categoryPromotion with id ${id} could not be found`,
      });
    }
    return this._repository.save(categoryPromotionFound);
  }

  async createCategoryPromotion(
    createCategoryPromotionInput: CreateCategoryPromotionInput,
  ): Promise<CategoryPromotion> {
    const newCategoryPromotion = this._repository.create({
      ...createCategoryPromotionInput,
    });
    return newCategoryPromotion;
  }

  async updateCategoryPromotion(
    id: string,
    updateCategoryPromotionInput: UpdateCategoryPromotionInput,
  ): Promise<CategoryPromotion> {
    await this.getCategoryPromotionById(id);
    const newCategoryPromotion = await this._repository.preload({
      ...updateCategoryPromotionInput,
    });
    if (!newCategoryPromotion) {
      return this._exceptionsService.notFound({
        message: 'The CategoryPromotion could not be preloaded',
      });
    }
    return this._repository.save(newCategoryPromotion);
  }

  async removeCategoryPromotion(id: string): Promise<CategoryPromotion> {
    const categoryPromotion = await this.getCategoryPromotionById(id);
    return this._repository.remove(categoryPromotion);
  }
}
