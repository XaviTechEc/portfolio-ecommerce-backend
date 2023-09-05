import { ICategoryPromotionRepository } from 'src/core/abstracts/repositories';
import { Repository } from 'typeorm';
import { CategoryPromotion } from '../../entities/outputs/entities';
import {
  IGenericArgs,
  CreateCategoryPromotionInput,
  UpdateCategoryPromotionInput,
} from 'src/core/dtos';
import { LoggerService } from '@nestjs/common';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';

export class CategoryPromotionsRepository
  implements ICategoryPromotionRepository<CategoryPromotion>
{
  private _repository: Repository<CategoryPromotion>;
  private _loggerService: LoggerService;
  private _exceptionsService: ExceptionsService;

  constructor(
    repository: Repository<CategoryPromotion>,
    loggerService: LoggerService,
    exceptionsService: ExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
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
