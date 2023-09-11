import { IProductPromotion } from '../../entities/product-promotion.entity';
import { IProductPromotionRepository } from '../repositories/product-promotion.repository';

export abstract class IProductPromotionsDataSourceService {
  abstract productPromotions: IProductPromotionRepository<IProductPromotion>;
}
