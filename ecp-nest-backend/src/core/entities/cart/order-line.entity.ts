import { IProductItem } from '../products/product-item.entity';
import { IReview } from '../reviews/review.entity';
import { IShopOrder } from './shop-order.entity';

export class IOrderLine {
  id: string;
  quantity: number;
  totalPrice: number;
  review: IReview[];
  productItem: IProductItem;
  shopOrder: IShopOrder;
}
