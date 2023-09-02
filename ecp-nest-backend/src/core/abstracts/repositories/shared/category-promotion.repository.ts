import {
  CreateCategoryPromotionInput,
  IGenericArgs,
  UpdateCategoryPromotionInput,
} from 'src/core/dtos';

export abstract class ICategoryPromotionRepository<T> {
  abstract getAllCategoryPromotion(args?: IGenericArgs<T>): Promise<T[]>;
  abstract getCategoryPromotionById(id: string): Promise<T>;
  abstract createCategoryPromotion(
    createCategoryPromotionInput: CreateCategoryPromotionInput,
  ): Promise<T>;
  abstract updateCategoryPromotion(
    id: string,
    updateCategoryPromotionInput: UpdateCategoryPromotionInput,
  ): Promise<T>;
  abstract removeCategoryPromotion(id: string): Promise<T>;
}
