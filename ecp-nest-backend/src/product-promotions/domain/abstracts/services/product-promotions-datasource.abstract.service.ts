import { IProductPromotion } from '../../entities/product-promotion.entity';
import { IProductPromotionsRepository } from '../repositories/product-promotion.repository';

export abstract class IProductPromotionsDataSourceService {
  abstract productPromotions: IProductPromotionsRepository<IProductPromotion>;
}
