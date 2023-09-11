import { Injectable } from '@nestjs/common';
import {
  CreateCategoryPromotionInput,
  UpdateCategoryPromotionInput,
} from 'src/core/dtos';
import { ICategoryPromotion } from 'src/core/entities';

@Injectable()
export class CategoryPromotionFactoryService {
  createCategoryPromotion(
    createCategoryPromotionInput: CreateCategoryPromotionInput,
  ) {
    const newCategoryPromotion = new ICategoryPromotion();
    newCategoryPromotion.category = createCategoryPromotionInput.category;
    newCategoryPromotion.promotion = createCategoryPromotionInput.promotion;
    return newCategoryPromotion;
  }
  updateCategoryPromotion(
    updateCategoryPromotionInput: UpdateCategoryPromotionInput,
  ) {
    const newCategoryPromotion = new ICategoryPromotion();
    newCategoryPromotion.category = updateCategoryPromotionInput.category;
    newCategoryPromotion.promotion = updateCategoryPromotionInput.promotion;
    return newCategoryPromotion;
  }
}
