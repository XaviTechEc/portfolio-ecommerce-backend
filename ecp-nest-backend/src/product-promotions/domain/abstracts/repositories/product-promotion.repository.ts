import {
  IGenericArgs,
  PaginationArgs,
} from 'src/common/domain/dtos/graphql/args';
import {
  CreateProductPromotionInput,
  UpdateProductPromotionInput,
} from '../../dtos/graphql/inputs/product-promotion.input';
import { GetAllGenericResponse } from 'src/common/domain/interfaces/responses/get-all-generic-response.interface';

export abstract class IProductPromotionRepository<T> {
  abstract getAllProductPromotion(
    args?: IGenericArgs<T>,
  ): Promise<GetAllGenericResponse<T>>;
  abstract getProductPromotionById(id: string): Promise<T>;
  abstract createProductPromotion(
    createProductPromotionInput: CreateProductPromotionInput,
  ): Promise<T>;
  abstract updateProductPromotion(
    id: string,
    updateProductPromotionInput: UpdateProductPromotionInput,
  ): Promise<T>;
  abstract removeProductPromotion(id: string): Promise<T>;
  abstract getProductPromotionsBy(
    term: string,
    fields: (keyof T)[],
    paginationArgs: PaginationArgs,
  ): Promise<GetAllGenericResponse<T>>;
}
