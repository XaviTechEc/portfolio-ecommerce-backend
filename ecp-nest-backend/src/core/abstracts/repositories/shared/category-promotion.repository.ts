import {
  CreateCategoryPromotionInput,
  IGenericArgs,
  UpdateCategoryPromotionInput,
} from 'src/core/dtos';

export abstract class ICategoryPromotionRepository<T> {
  abstract getAllCategoryPromotion(args?: IGenericArgs<T>): Promise<T[]>;
  abstract createCategoryPromotion(
    createCategoryPromotionInput: CreateCategoryPromotionInput,
  ): Promise<T>;
  abstract getOneCategoryPromotionById(id: string): Promise<T>;
  abstract updateOneCategoryPromotionById(
    updateCategoryPromotionInput: UpdateCategoryPromotionInput,
  ): Promise<T>;
  abstract deleteOneCategoryPromotionById(id: string): Promise<T>;
}
