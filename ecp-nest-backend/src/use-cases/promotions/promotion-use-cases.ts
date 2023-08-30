import { Injectable } from '@nestjs/common';
import { IPromotionsRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { PromotionFactoryService } from './promotion-factory.service';
import { CreatePromotionInput, UpdatePromotionInput } from 'src/core/dtos';
import { IPromotion } from 'src/core/entities';
import { IGenericArgs } from 'src/core/abstracts/generic-args.repository';

@Injectable()
export class PromotionUseCases implements IPromotionsRepository<IPromotion> {
  constructor(
    private dataService: IDataSourcesService,
    private promotionFactoryService: PromotionFactoryService,
  ) {}
  getAllPromotions(args?: IGenericArgs<IPromotion>): Promise<IPromotion[]> {
    throw new Error('Method not implemented.');
  }
  getPromotionById(id: string): Promise<IPromotion> {
    throw new Error('Method not implemented.');
  }
  createPromotion(
    createPromotionInput: CreatePromotionInput,
  ): Promise<IPromotion> {
    throw new Error('Method not implemented.');
  }
  updatePromotion(
    id: string,
    updatePromotionInput: UpdatePromotionInput,
  ): Promise<IPromotion> {
    throw new Error('Method not implemented.');
  }
  removePromotion(id: string): Promise<IPromotion> {
    throw new Error('Method not implemented.');
  }
}
