import { Injectable } from '@nestjs/common';
import { CreateShopOrderInput, UpdateShopOrderInput } from 'src/core/dtos';
import { IShopOrder } from 'src/core/entities';

@Injectable()
export class ShopOrderFactoryService {
  createShopOrder(createShopOrderInput: CreateShopOrderInput) {
    const newShopOrder = new IShopOrder();
    newShopOrder.user = createShopOrderInput.userId;
    newShopOrder.userPaymentMethod = createShopOrderInput.userPaymentMethodId;
    newShopOrder.address = createShopOrderInput.shoppingAddressId;
    newShopOrder.shippingMethod = createShopOrderInput.shippingMethodId;
    newShopOrder.orderTotal = createShopOrderInput.orderTotal;
    newShopOrder.orderStatus = createShopOrderInput.orderStatusId;
    return newShopOrder;
  }
  updateShopOrder(updateShopOrderInput: UpdateShopOrderInput) {
    const newShopOrder = new IShopOrder();
    newShopOrder.user = updateShopOrderInput.userId;
    newShopOrder.userPaymentMethod = updateShopOrderInput.userPaymentMethodId;
    newShopOrder.address = updateShopOrderInput.shoppingAddressId;
    newShopOrder.shippingMethod = updateShopOrderInput.shippingMethodId;
    newShopOrder.orderTotal = updateShopOrderInput.orderTotal;
    newShopOrder.orderStatus = updateShopOrderInput.orderStatusId;
    return newShopOrder;
  }
}
