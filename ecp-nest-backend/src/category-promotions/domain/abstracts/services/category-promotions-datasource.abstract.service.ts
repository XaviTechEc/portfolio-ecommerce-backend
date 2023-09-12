import { ICategoryPromotion } from '../../entities/category-promotion.entity';
import { ICategoryPromotionRepository } from '../repositories/category-promotion.repository';

export abstract class ICategoryPromotionsDataSourceService {
  abstract categoryPromotions: ICategoryPromotionRepository<ICategoryPromotion>;
}
