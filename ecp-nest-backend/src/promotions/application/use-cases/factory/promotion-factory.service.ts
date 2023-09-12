import { Injectable } from '@nestjs/common';
import {
  CreatePromotionInput,
  UpdatePromotionInput,
} from 'src/promotions/domain/dtos/graphql/inputs/promotion.input';
import { IPromotion } from 'src/promotions/domain/entities/promotion.entity';

@Injectable()
export class PromotionFactoryService {
  createPromotion(createPromotionInput: CreatePromotionInput) {
    const newPromotion = new IPromotion();
    newPromotion.description = createPromotionInput.description;
    newPromotion.percentageDiscount = createPromotionInput.percentageDiscount;
    newPromotion.startDate = createPromotionInput.startDate;
    newPromotion.endDate = createPromotionInput.endDate;
    return newPromotion;
  }
  updatePromotion(updatePromotionInput: UpdatePromotionInput) {
    const newPromotion = new IPromotion();
    newPromotion.description = updatePromotionInput.description;
    newPromotion.percentageDiscount = updatePromotionInput.percentageDiscount;
    newPromotion.startDate = updatePromotionInput.startDate;
    newPromotion.endDate = updatePromotionInput.endDate;
    return newPromotion;
  }
}
