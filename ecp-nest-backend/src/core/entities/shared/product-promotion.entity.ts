import { IProduct } from '../products/product.entity';
import { IPromotion } from '../promotions/promotion.entity';

export class IProductPromotion {
  product: IProduct;
  promotion: IPromotion;
}
