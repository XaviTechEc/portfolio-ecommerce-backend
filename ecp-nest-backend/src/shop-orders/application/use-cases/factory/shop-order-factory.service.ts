import { Injectable } from '@nestjs/common';
import {
  CreateShopOrderInput,
  UpdateShopOrderInput,
} from 'src/shop-orders/domain/dtos/graphql/inputs/shop-order.input';
import { IShopOrder } from 'src/shop-orders/domain/entities/shop-order.entity';

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
