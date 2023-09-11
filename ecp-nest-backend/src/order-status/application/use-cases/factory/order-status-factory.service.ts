import { Injectable } from '@nestjs/common';
import { CreateOrderStatusInput, UpdateOrderStatusInput } from 'src/core/dtos';
import { IOrderStatus } from 'src/core/entities';

@Injectable()
export class OrderStatusFactoryService {
  createOrderStatus(createOrderStatusInput: CreateOrderStatusInput) {
    const newOrderStatus = new IOrderStatus();
    newOrderStatus.statusValue = createOrderStatusInput.statusValue;
    return newOrderStatus;
  }
  updateOrderStatus(updateOrderStatusInput: UpdateOrderStatusInput) {
    const newOrderStatus = new IOrderStatus();
    newOrderStatus.statusValue = updateOrderStatusInput.statusValue;
    return newOrderStatus;
  }
}
