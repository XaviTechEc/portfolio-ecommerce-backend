import { Injectable } from '@nestjs/common';
import { CreateOrderLineInput, UpdateOrderLineInput } from 'src/core/dtos';
import { IOrderLine } from 'src/core/entities';

@Injectable()
export class OrderLineFactoryService {
  createOrderLine(createOrderLineInput: CreateOrderLineInput) {
    const newOrderLine = new IOrderLine();
    newOrderLine.productItemId = createOrderLineInput.productItemId;
    newOrderLine.shopOrderId = createOrderLineInput.shopOrderId;
    newOrderLine.quantity = createOrderLineInput.quantity;
    newOrderLine.totalPrice = createOrderLineInput.totalPrice;
    return newOrderLine;
  }
  updateOrderLine(updateOrderLineInput: UpdateOrderLineInput) {
    const newOrderLine = new IOrderLine();
    newOrderLine.productItemId = updateOrderLineInput.productItemId;
    newOrderLine.shopOrderId = updateOrderLineInput.shopOrderId;
    newOrderLine.quantity = updateOrderLineInput.quantity;
    newOrderLine.totalPrice = updateOrderLineInput.totalPrice;
    return newOrderLine;
  }
}
