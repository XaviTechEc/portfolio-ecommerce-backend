import {
  CreateProductPromotionInput,
  IGenericArgs,
  UpdateProductPromotionInput,
} from 'src/core/dtos';

export abstract class IProductPromotionRepository<T> {
  abstract getAllProductPromotion(args?: IGenericArgs<T>): Promise<T[]>;
  abstract getProductPromotionById(id: string): Promise<T>;
  abstract createProductPromotion(
    createProductPromotionInput: CreateProductPromotionInput,
  ): Promise<T>;
  abstract updateProductPromotion(
    id: string,
    updateProductPromotionInput: UpdateProductPromotionInput,
  ): Promise<T>;
  abstract removeProductPromotion(id: string): Promise<T>;
}
