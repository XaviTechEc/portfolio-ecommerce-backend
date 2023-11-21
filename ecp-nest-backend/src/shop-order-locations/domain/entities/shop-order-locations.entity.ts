import { ILocation } from 'src/addresses/domain/entities/location.entity';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { IShopOrder } from 'src/shop-orders/domain/entities/shop-order.entity';

export class IShopOrderLocation extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  id: string;
  shopOrder: IShopOrder;
  location: ILocation;
}
