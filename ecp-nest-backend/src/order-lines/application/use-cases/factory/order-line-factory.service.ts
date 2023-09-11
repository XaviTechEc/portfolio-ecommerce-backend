import { Injectable } from '@nestjs/common';
import {
  CreateOrderLineInput,
  UpdateOrderLineInput,
} from 'src/order-lines/domain/dtos/graphql/inputs/order-line.input';
import { IOrderLine } from 'src/order-lines/domain/entities/order-line.entity';

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
