import { IProduct } from 'src/products/domain/entities/product.entity';
import { IPromotion } from 'src/promotions/domain/entities/promotion.entity';

export class IProductPromotion {
  id: string;
  product: IProduct;
  promotion: IPromotion;
}
