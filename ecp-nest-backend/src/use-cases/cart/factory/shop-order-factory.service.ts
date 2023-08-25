import { Injectable } from '@nestjs/common';
import { CreateShopOrderInput, UpdateShopOrderInput } from 'src/core/dtos';
import { IShopOrder } from 'src/core/entities';

@Injectable()
export class ShopOrderFactoryService {
  createShopOrder(createShopOrderInput: CreateShopOrderInput) {
    const newShopOrder = new IShopOrder();
    newShopOrder.userId = createShopOrderInput.userId;
    newShopOrder.userPaymentMethodId = createShopOrderInput.userPaymentMethodId;
    newShopOrder.shoppingAddressId = createShopOrderInput.shoppingAddressId;
    newShopOrder.shippingMethodId = createShopOrderInput.shippingMethodId;
    newShopOrder.orderTotal = createShopOrderInput.orderTotal;
    newShopOrder.orderStatusId = createShopOrderInput.orderStatusId;
    newShopOrder.lastLocationId = createShopOrderInput.lastLocationId;
    return newShopOrder;
  }
  updateShopOrder(updateShopOrderInput: UpdateShopOrderInput) {
    const newShopOrder = new IShopOrder();
    newShopOrder.userId = updateShopOrderInput.userId;
    newShopOrder.userPaymentMethodId = updateShopOrderInput.userPaymentMethodId;
    newShopOrder.shoppingAddressId = updateShopOrderInput.shoppingAddressId;
    newShopOrder.shippingMethodId = updateShopOrderInput.shippingMethodId;
    newShopOrder.orderTotal = updateShopOrderInput.orderTotal;
    newShopOrder.orderStatusId = updateShopOrderInput.orderStatusId;
    newShopOrder.lastLocationId = updateShopOrderInput.lastLocationId;
    return newShopOrder;
  }
}
