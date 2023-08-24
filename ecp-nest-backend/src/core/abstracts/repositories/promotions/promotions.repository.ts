import { IPromotion } from 'src/core/entities';

export abstract class IPromotionsRepository {
  abstract getAllPromotions(): Promise<IPromotion[]>;
  abstract getPromotionById(id: string): Promise<IPromotion>;
  abstract createPromotion(createPromotionInput: any): Promise<IPromotion>;
  abstract updatePromotion(updatePromotionInput: any): Promise<IPromotion>;
  abstract removePromotion(id: string): Promise<IPromotion>;
}
