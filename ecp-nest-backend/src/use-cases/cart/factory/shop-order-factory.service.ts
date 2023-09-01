import { Injectable } from '@nestjs/common';
import { CreateShopOrderInput, UpdateShopOrderInput } from 'src/core/dtos';
import { IShopOrder } from 'src/core/entities';

@Injectable()
export class ShopOrderFactoryService {
  createShopOrder(createShopOrderInput: CreateShopOrderInput) {
    const newShopOrder = new IShopOrder();
    newShopOrder.user = createShopOrderInput.user;
    newShopOrder.userPaymentMethod = createShopOrderInput.userPaymentMethod;
    newShopOrder.address = createShopOrderInput.address;
    newShopOrder.shippingMethod = createShopOrderInput.shippingMethod;
    newShopOrder.orderTotal = createShopOrderInput.orderTotal;
    newShopOrder.orderStatus = createShopOrderInput.orderStatus;
    return newShopOrder;
  }
  updateShopOrder(updateShopOrderInput: UpdateShopOrderInput) {
    const newShopOrder = new IShopOrder();
    newShopOrder.user = updateShopOrderInput.user;
    newShopOrder.userPaymentMethod = updateShopOrderInput.userPaymentMethod;
    newShopOrder.address = updateShopOrderInput.address;
    newShopOrder.shippingMethod = updateShopOrderInput.shippingMethod;
    newShopOrder.orderTotal = updateShopOrderInput.orderTotal;
    newShopOrder.orderStatus = updateShopOrderInput.orderStatus;
    return newShopOrder;
  }
}
