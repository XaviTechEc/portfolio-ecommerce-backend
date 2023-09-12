import { Injectable } from '@nestjs/common';
import {
  CreateCategoryPromotionInput,
  UpdateCategoryPromotionInput,
} from 'src/category-promotions/domain/dtos/graphql/inputs/category-promotion.input';
import { ICategoryPromotion } from 'src/category-promotions/domain/entities/category-promotion.entity';

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
