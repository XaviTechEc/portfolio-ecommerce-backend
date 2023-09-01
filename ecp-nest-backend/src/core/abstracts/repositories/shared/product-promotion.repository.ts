import {
  CreateProductPromotionInput,
  IGenericArgs,
  UpdateProductPromotionInput,
} from 'src/core/dtos';

export abstract class IProductPromotionRepository<T> {
  abstract getAllProductPromotion(args?: IGenericArgs<T>): Promise<T[]>;
  abstract createProductPromotion(
    createProductPromotionInput: CreateProductPromotionInput,
  ): Promise<T>;
  abstract getOneProductPromotionById(id: string): Promise<T>;
  abstract updateOneProductPromotionById(
    updateProductPromotionInput: UpdateProductPromotionInput,
  ): Promise<T>;
  abstract deleteOneProductPromotionById(id: string): Promise<T>;
}
