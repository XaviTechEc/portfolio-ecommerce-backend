import {
  CreateCategoryPromotionInput,
  IGenericArgs,
  UpdateCategoryPromotionInput,
} from 'src/core/dtos';

export abstract class ICategoryPromotionRepository<T> {
  abstract getAllCategoryPromotion(args?: IGenericArgs<T>): Promise<T[]>;
  abstract getOneCategoryPromotionById(id: string): Promise<T>;
  abstract createCategoryPromotion(
    createCategoryPromotionInput: CreateCategoryPromotionInput,
  ): Promise<T>;
  abstract updateOneCategoryPromotionById(
    id: string,
    updateCategoryPromotionInput: UpdateCategoryPromotionInput,
  ): Promise<T>;
  abstract deleteOneCategoryPromotionById(id: string): Promise<T>;
}
