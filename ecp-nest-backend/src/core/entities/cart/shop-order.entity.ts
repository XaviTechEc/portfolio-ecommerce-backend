import { IAddress } from '../addresses/address.entity';
import { ILocation } from '../addresses/location.entity';
import { IUserPaymentMethod } from '../shared/user-payment-method.entity';
import { IUser } from '../users/user.entity';
import { IOrderStatus } from './order-status.entity';
import { IShippingMethod } from './shipping-method.entity';

export class IShopOrder {
  id: string;
  orderTotal: number;
  createdAt: Date;
  updatedAt?: Date;
  shippingMethod: IShippingMethod;
  orderStatus: IOrderStatus;
  location: ILocation;
  user: IUser; // userId
  userPaymentMethod: IUserPaymentMethod; // userPaymentMethodId
  address: IAddress; //shippingAddress
}
