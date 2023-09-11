import { Injectable } from '@nestjs/common';
import { IDataSourcesService } from 'src/common/domain/abstracts/services';
import { IGenericArgs } from 'src/common/domain/dtos/graphql/args';
import { IPromotionsRepository } from 'src/promotions/domain/abstracts/repositories/promotions.repository';
import {
  CreatePromotionInput,
  UpdatePromotionInput,
} from 'src/promotions/domain/dtos/graphql/inputs/promotion.input';
import { IPromotion } from 'src/promotions/domain/entities/promotion.entity';
import { PromotionFactoryService } from './factory/promotion-factory.service';

@Injectable()
export class PromotionUseCases implements IPromotionsRepository<IPromotion> {
  constructor(
    private dataService: IDataSourcesService,
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
