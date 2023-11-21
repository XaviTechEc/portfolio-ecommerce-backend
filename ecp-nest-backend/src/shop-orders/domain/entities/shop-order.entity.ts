import { IAddress } from 'src/addresses/domain/entities/address.entity';
import { IGenericAdditionalPropsWithUserRefAndTimeStamps } from 'src/common/frameworks/data-services/postgresql/entities/generic-additional-props.entity';
import { IOrderStatus } from 'src/order-status/domain/entities/order-status.entity';
import { IShippingMethod } from 'src/shipping-methods/domain/entities/shipping-method.entity';
import { IUserPaymentMethod } from 'src/user-payment-methods/domain/entities/user-payment-method.entity';
import { IUser } from 'src/users/domain/entities/user.entity';

export class IShopOrder extends IGenericAdditionalPropsWithUserRefAndTimeStamps {
  id: string;
  orderTotal: number;
  shippingMethod: IShippingMethod;
  orderStatus: IOrderStatus;
  user: IUser;
  userPaymentMethod: IUserPaymentMethod;
  address: IAddress;
}
