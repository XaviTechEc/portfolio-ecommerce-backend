import { Injectable } from '@nestjs/common';
import { IGenericArgs } from 'src/common/domain/dtos/graphql/args';
import { IPromotionsDataSourceService } from 'src/promotions/domain/abstracts/services/promotions-datasource.abstract.service';
import {
  CreatePromotionInput,
  UpdatePromotionInput,
} from 'src/promotions/domain/dtos/graphql/inputs/promotion.input';
import { IPromotion } from 'src/promotions/domain/entities/promotion.entity';
import { PromotionFactoryService } from './factory/promotion-factory.service';

@Injectable()
export class PromotionUseCases {
  constructor(
    private dataService: IPromotionsDataSourceService,
    private promotionFactoryService: PromotionFactoryService,
  ) {}
  getAllPromotions(args?: IGenericArgs<IPromotion>): Promise<IPromotion[]> {
    return this.dataService.promotions.getAllPromotions(args);
  }
  getPromotionById(id: string): Promise<IPromotion> {
    return this.dataService.promotions.getPromotionById(id);
  }
  createPromotion(
    createPromotionInput: CreatePromotionInput,
  ): Promise<IPromotion> {
    const promotion =
      this.promotionFactoryService.createPromotion(createPromotionInput);
    return this.dataService.promotions.createPromotion(promotion);
  }
  updatePromotion(
    id: string,
    updatePromotionInput: UpdatePromotionInput,
  ): Promise<IPromotion> {
    const promotion =
      this.promotionFactoryService.updatePromotion(updatePromotionInput);
    return this.dataService.promotions.updatePromotion(id, promotion);
  }
  removePromotion(id: string): Promise<IPromotion> {
    return this.dataService.promotions.removePromotion(id);
  }
}
