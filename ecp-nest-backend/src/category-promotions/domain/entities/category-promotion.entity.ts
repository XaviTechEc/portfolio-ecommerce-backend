import { ICategory } from 'src/categories/domain/entities/category.entity';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { IPromotion } from 'src/promotions/domain/entities/promotion.entity';

export class ICategoryPromotion extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  id: string;
  category: ICategory;
  promotion: IPromotion;
}
