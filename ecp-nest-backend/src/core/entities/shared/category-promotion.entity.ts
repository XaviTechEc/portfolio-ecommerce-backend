import { ICategory } from '../categories/category.entity';
import { IPromotion } from '../promotions/promotion.entity';

export class ICategoryPromotion {
  id: string;
  category: ICategory;
  promotion: IPromotion;
}
