import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';
import { IPromotionsRepository } from 'src/core/abstracts/repositories';
import { CreatePromotionInput, UpdatePromotionInput } from 'src/core/dtos';
import { Repository } from 'typeorm';
import { Promotion } from '../../entities/outputs/entities';
import { LoggerService } from '@nestjs/common';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';

export class PromotionsRepository implements IPromotionsRepository<Promotion> {
  private _repository: Repository<Promotion>;
  private _loggerService: LoggerService;
  private _exceptionsService: ExceptionsService;

  constructor(
    repository: Repository<Promotion>,
    loggerService: LoggerService,
    exceptionsService: ExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }

  async getAllPromotions(args?: IGenericArgs<Promotion>): Promise<Promotion[]> {
    let qb = this._repository.createQueryBuilder('promotion');

    if (args) {
      const { paginationArgs, searchArgs } = args;
      if (paginationArgs) {
        const { limit = 10, offset = 0 } = paginationArgs;
        qb = qb.take(limit).skip(offset);
      }

      if (searchArgs) {
        const { searchTerm } = searchArgs;

        qb = qb.where('description ILIKE LOWER(:description)').setParameters({
          description: `%${searchTerm}%`,
        });
      }
    }
    const promotions = await qb.getMany();
    return promotions;
  }
  async getPromotionById(id: string): Promise<Promotion> {
    const promotionFound = await this._repository.findOneBy({ id });
    if (!promotionFound) {
      return this._exceptionsService.notFound({
        message: `The promotion with id ${id} could not be found`,
      });
    }
    return this._repository.save(promotionFound);
  }
  async createPromotion(
    createPromotionInput: CreatePromotionInput,
  ): Promise<Promotion> {
    const newPromotion = this._repository.create({ ...createPromotionInput });
    return newPromotion;
  }
  async updatePromotion(
    id: string,
    updatePromotionInput: UpdatePromotionInput,
  ): Promise<Promotion> {
    await this.getPromotionById(id);
    const newPromotion = await this._repository.preload({
      ...updatePromotionInput,
    });
    if (!newPromotion) {
      return this._exceptionsService.notFound({
        message: 'The Promotion could not be preloaded',
      });
    }
    return this._repository.save(newPromotion);
  }
  async removePromotion(id: string): Promise<Promotion> {
    const promotion = await this.getPromotionById(id);
    return this._repository.remove(promotion);
  }
}
