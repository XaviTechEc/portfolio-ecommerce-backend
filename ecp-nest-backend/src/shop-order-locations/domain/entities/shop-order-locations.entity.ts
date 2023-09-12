import { ILocation } from 'src/addresses/domain/entities/location.entity';
import { IShopOrder } from 'src/shop-orders/domain/entities/shop-order.entity';

export class IShopOrderLocation {
  id: string;
  shopOrder: IShopOrder;
  location: ILocation;
}
