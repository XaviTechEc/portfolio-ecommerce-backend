export class IShopOrder {
  id: string;
  userId: string;
  userPaymentMethodId: string;
  shoppingAddressId: string;
  shippingMethodId: string;
  orderTotal: number;
  orderStatusId: string;
  lastLocationId?: string;
}
