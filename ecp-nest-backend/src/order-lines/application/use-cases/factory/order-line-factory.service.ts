import { Injectable } from '@nestjs/common';
import { CreateOrderLineInput, UpdateOrderLineInput } from 'src/core/dtos';
import { IOrderLine } from 'src/core/entities';

@Injectable()
export class OrderLineFactoryService {
  createOrderLine(createOrderLineInput: CreateOrderLineInput) {
    const newOrderLine = new IOrderLine();
    newOrderLine.productItem = createOrderLineInput.productItem;
    newOrderLine.shopOrder = createOrderLineInput.shopOrder;
    newOrderLine.quantity = createOrderLineInput.quantity;
    newOrderLine.totalPrice = createOrderLineInput.totalPrice;
    return newOrderLine;
  }
  updateOrderLine(updateOrderLineInput: UpdateOrderLineInput) {
    const newOrderLine = new IOrderLine();
    newOrderLine.productItem = updateOrderLineInput.productItem;
    newOrderLine.shopOrder = updateOrderLineInput.shopOrder;
    newOrderLine.quantity = updateOrderLineInput.quantity;
    newOrderLine.totalPrice = updateOrderLineInput.totalPrice;
    return newOrderLine;
  }
}
