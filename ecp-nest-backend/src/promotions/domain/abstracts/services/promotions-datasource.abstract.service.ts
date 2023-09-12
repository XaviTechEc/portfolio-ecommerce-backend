import { IPromotion } from '../../entities/promotion.entity';
import { IPromotionsRepository } from '../repositories/promotions.repository';

export abstract class IPromotionsDataSourceService {
  abstract promotions: IPromotionsRepository<IPromotion>;
}
