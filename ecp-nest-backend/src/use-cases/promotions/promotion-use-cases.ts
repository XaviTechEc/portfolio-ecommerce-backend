import { Injectable } from '@nestjs/common';
import { IPromotionsRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { PromotionFactoryService } from './promotion-factory.service';
import { CreatePromotionInput, UpdatePromotionInput } from 'src/core/dtos';
import { IPromotion } from 'src/core/entities';

@Injectable()
export class PromotionUseCases implements IPromotionsRepository {
  constructor(
    private dataService: IDataSourcesService,
    private promotionFactoryService: PromotionFactoryService,
  ) {}
  getAllPromotions(): Promise<IPromotion[]> {
    return this.dataService.promotions.getAll();
  }
  getPromotionById(id: string): Promise<IPromotion> {
    return this.dataService.promotions.getOneById(id);
  }
  createPromotion(
    createPromotionInput: CreatePromotionInput,
  ): Promise<IPromotion> {
    const promotion =
      this.promotionFactoryService.createPromotion(createPromotionInput);
    return this.dataService.promotions.create(promotion);
  }
  updatePromotion(
    id: string,
    updatePromotionInput: UpdatePromotionInput,
  ): Promise<IPromotion> {
    const promotion =
      this.promotionFactoryService.updatePromotion(updatePromotionInput);
    return this.dataService.promotions.updateOneById(id, promotion);
  }
  removePromotion(id: string): Promise<IPromotion> {
    return this.dataService.promotions.deleteOneById(id);
  }
}
