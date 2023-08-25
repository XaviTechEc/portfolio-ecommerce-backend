import { CreatePromotionInput, UpdatePromotionInput } from 'src/core/dtos';
import { IPromotion } from 'src/core/entities';

export abstract class IPromotionsRepository {
  abstract getAllPromotions(): Promise<IPromotion[]>;
  abstract getPromotionById(id: string): Promise<IPromotion>;
  abstract createPromotion(
    createPromotionInput: CreatePromotionInput,
  ): Promise<IPromotion>;
  abstract updatePromotion(
    id: string,
    updatePromotionInput: UpdatePromotionInput,
  ): Promise<IPromotion>;
  abstract removePromotion(id: string): Promise<IPromotion>;
}
