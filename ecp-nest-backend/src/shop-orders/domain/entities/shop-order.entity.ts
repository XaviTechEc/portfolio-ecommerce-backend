import { IAddress } from 'src/addresses/domain/entities/address.entity';
import { IOrderStatus } from 'src/order-status/domain/entities/order-status.entity';
import { IShippingMethod } from 'src/shipping-methods/domain/entities/shipping-method.entity';
import { IUserPaymentMethod } from 'src/user-payment-methods/domain/entities/user-payment-method.entity';
import { IUser } from 'src/users/domain/entities/user.entity';

export class IShopOrder {
  id: string;
  orderTotal: number;
  createdAt: Date;
  updatedAt?: Date;
  shippingMethod: IShippingMethod;
  orderStatus: IOrderStatus;
  user: IUser;
  userPaymentMethod: IUserPaymentMethod;
  address: IAddress;
}
