import { ICategory } from '../categories/category.entity';
import { IPromotion } from '../promotions/promotion.entity';

export class ICategoryPromotion {
  category: ICategory;
  promotion: IPromotion;
}
