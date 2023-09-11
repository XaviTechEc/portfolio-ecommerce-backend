import { IGenericArgs } from 'src/common/domain/dtos/graphql/args';
import {
  CreatePromotionInput,
  UpdatePromotionInput,
} from '../../dtos/graphql/inputs/promotion.input';

export abstract class IPromotionsRepository<T> {
  abstract getAllPromotions(args?: IGenericArgs<T>): Promise<T[]>;
  abstract getPromotionById(id: string): Promise<T>;
  abstract createPromotion(
    createPromotionInput: CreatePromotionInput,
  ): Promise<T>;
  abstract updatePromotion(
    id: string,
    updatePromotionInput: UpdatePromotionInput,
  ): Promise<T>;
  abstract removePromotion(id: string): Promise<T>;
}
