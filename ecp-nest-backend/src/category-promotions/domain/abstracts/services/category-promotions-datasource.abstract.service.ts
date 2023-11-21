import { ICategoryPromotion } from '../../entities/category-promotion.entity';
import { ICategoryPromotionsRepository } from '../repositories/category-promotions.repository';

export abstract class ICategoryPromotionsDataSourceService {
  abstract categoryPromotions: ICategoryPromotionsRepository<ICategoryPromotion>;
}
