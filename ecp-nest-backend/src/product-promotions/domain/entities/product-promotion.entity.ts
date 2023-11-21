import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { IProduct } from 'src/products/domain/entities/product.entity';
import { IPromotion } from 'src/promotions/domain/entities/promotion.entity';

export class IProductPromotion extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  id: string;
  product: IProduct;
  promotion: IPromotion;
}
