import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { IProductItem } from 'src/product-items/domain/entities/product-item.entity';
import { IReview } from 'src/reviews/domain/entities/review.entity';
import { IShopOrder } from 'src/shop-orders/domain/entities/shop-order.entity';

export class IOrderLine extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  id: string;
  quantity: number;
  totalPrice: number;
  review: IReview[];
  productItem: IProductItem;
  shopOrder: IShopOrder;
}
