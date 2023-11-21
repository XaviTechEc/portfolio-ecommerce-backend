import { Injectable } from '@nestjs/common';
import {
  CreateProductPromotionInput,
  UpdateProductPromotionInput,
} from 'src/product-promotions/domain/dtos/graphql/inputs/product-promotion.input';
import { IProductPromotion } from 'src/product-promotions/domain/entities/product-promotion.entity';

@Injectable()
export class ProductPromotionFactoryService {
  createProductPromotion(
    createProductPromotionInput: CreateProductPromotionInput,
  ) {
    const newProductPromotion = new IProductPromotion();
    newProductPromotion.product = createProductPromotionInput.product;
    newProductPromotion.promotion = createProductPromotionInput.promotion;
    newProductPromotion.active = createProductPromotionInput.active;
    return newProductPromotion;
  }
  updateProductPromotion(
    updateProductPromotionInput: UpdateProductPromotionInput,
  ) {
    const newProductPromotion = new IProductPromotion();
    newProductPromotion.id = updateProductPromotionInput.id;
    newProductPromotion.product = updateProductPromotionInput.product;
    newProductPromotion.promotion = updateProductPromotionInput.promotion;
    newProductPromotion.active = updateProductPromotionInput.active;
    return newProductPromotion;
  }
}
