import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { IGenericArgs } from 'src/common/domain/dtos/graphql/args';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { IPromotionsRepository } from 'src/promotions/domain/abstracts/repositories/promotions.repository';
import {
  CreatePromotionInput,
  UpdatePromotionInput,
} from 'src/promotions/domain/dtos/graphql/inputs/promotion.input';
import { Repository } from 'typeorm';
import { Promotion } from '../entities/Promotion.entity';
import { GetAllGenericResponse } from 'src/common/domain/interfaces/responses/get-all-generic-response.interface';
import { getPageCount } from 'src/common/infrastructure/helpers/get-page-count.helper';

const CONTEXT = 'PromotionsRepository';

export class PromotionsRepository implements IPromotionsRepository<Promotion> {
  private _repository: Repository<Promotion>;
  private _loggerService: ILoggerService;
  private _exceptionsService: IExceptionsService;

  constructor(
    repository: Repository<Promotion>,
    loggerService: ILoggerService,
    exceptionsService: IExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }

  async getAllPromotions(
    args?: IGenericArgs<Promotion>,
  ): Promise<GetAllGenericResponse<Promotion>> {
    try {
      let qb = this._repository.createQueryBuilder('promotion');
      let pageSize;

      if (args) {
        const { paginationArgs, searchArgs } = args;
        if (paginationArgs) {
          const { limit = 10, offset = 0 } = paginationArgs;
          pageSize = limit;
          qb = qb.take(limit).skip(offset);
        }

        if (searchArgs) {
          const { searchTerm } = searchArgs;

          if (searchTerm) {
            qb = qb
              .where('promotion.description ILIKE LOWER(:description)')
              .setParameters({
                description: `%${searchTerm}%`,
              });
          }
        }
      }
      const [items, total] = await qb.getManyAndCount();
      return { items, total, pageCount: getPageCount(total, pageSize) };
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async getPromotionById(id: string): Promise<Promotion> {
    try {
      const promotionFound = await this._repository.findOneBy({ id });
      if (!promotionFound) {
        return this._exceptionsService.notFound({
          message: `The promotion with id ${id} could not be found`,
        });
      }
      return promotionFound;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async createPromotion(
    createPromotionInput: CreatePromotionInput,
  ): Promise<Promotion> {
    try {
      const newPromotion = this._repository.create({ ...createPromotionInput });
      return this._repository.save(newPromotion);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async updatePromotion(
    id: string,
    updatePromotionInput: UpdatePromotionInput,
  ): Promise<Promotion> {
    try {
      await this.getPromotionById(id);
      const newPromotion = await this._repository.preload({
        ...updatePromotionInput,
      });
      return this._repository.save(newPromotion);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async removePromotion(id: string): Promise<Promotion> {
    try {
      const promotion = await this.getPromotionById(id);
      return this._repository.remove(promotion);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }
}
