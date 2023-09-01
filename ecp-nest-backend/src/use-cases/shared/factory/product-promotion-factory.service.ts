import { Injectable } from '@nestjs/common';
import {
  CreateProductPromotionInput,
  UpdateProductPromotionInput,
} from 'src/core/dtos';
import { IProductPromotion } from 'src/core/entities';

@Injectable()
export class ProductPromotionFactoryService {
  createProductPromotion(
    createProductPromotionInput: CreateProductPromotionInput,
  ) {
    const newProductPromotion = new IProductPromotion();
    newProductPromotion.product = createProductPromotionInput.product;
    newProductPromotion.promotion = createProductPromotionInput.promotion;
    return newProductPromotion;
  }
  updateProductPromotion(
    updateProductPromotionInput: UpdateProductPromotionInput,
  ) {
    const newProductPromotion = new IProductPromotion();
    newProductPromotion.product = updateProductPromotionInput.product;
    newProductPromotion.promotion = updateProductPromotionInput.promotion;
    return newProductPromotion;
  }
}
