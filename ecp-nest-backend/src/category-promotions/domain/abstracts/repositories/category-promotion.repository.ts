import {
  IGenericArgs,
  PaginationArgs,
} from 'src/common/domain/dtos/graphql/args';
import {
  CreateCategoryPromotionInput,
  UpdateCategoryPromotionInput,
} from '../../dtos/graphql/inputs/category-promotion.input';
import { GetAllGenericResponse } from 'src/common/domain/interfaces/responses/get-all-generic-response.interface';

export abstract class ICategoryPromotionRepository<T> {
  abstract getAllCategoryPromotion(
    args?: IGenericArgs<T>,
  ): Promise<GetAllGenericResponse<T>>;
  abstract getCategoryPromotionById(id: string): Promise<T>;
  abstract createCategoryPromotion(
    createCategoryPromotionInput: CreateCategoryPromotionInput,
  ): Promise<T>;
  abstract updateCategoryPromotion(
    id: string,
    updateCategoryPromotionInput: UpdateCategoryPromotionInput,
  ): Promise<T>;
  abstract removeCategoryPromotion(id: string): Promise<T>;

  abstract getCategoryPromotionBy(
    term: string,
    fields: (keyof T)[],
    paginationArgs: PaginationArgs,
  ): Promise<GetAllGenericResponse<T>>;
}
