import { CreatePromotionInput, UpdatePromotionInput } from 'src/core/dtos';
import { IGenericArgs } from '../../../dtos/graphql/args/generic-args.repository';

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
