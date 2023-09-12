import { ICategory } from 'src/categories/domain/entities/category.entity';
import { IPromotion } from 'src/promotions/domain/entities/promotion.entity';

export class ICategoryPromotion {
  id: string;
  category: ICategory;
  promotion: IPromotion;
}
