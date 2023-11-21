import { Injectable } from '@nestjs/common';
import {
  CreateOrderStatusInput,
  UpdateOrderStatusInput,
} from 'src/order-status/domain/dtos/graphql/inputs/order-status.input';
import { IOrderStatus } from 'src/order-status/domain/entities/order-status.entity';

@Injectable()
export class OrderStatusFactoryService {
  createOrderStatus(createOrderStatusInput: CreateOrderStatusInput) {
    const newOrderStatus = new IOrderStatus();
    newOrderStatus.statusValue = createOrderStatusInput.statusValue;
    newOrderStatus.active = createOrderStatusInput.active;
    return newOrderStatus;
  }
  updateOrderStatus(updateOrderStatusInput: UpdateOrderStatusInput) {
    const newOrderStatus = new IOrderStatus();
    newOrderStatus.id = updateOrderStatusInput.id;
    newOrderStatus.statusValue = updateOrderStatusInput.statusValue;
    newOrderStatus.active = updateOrderStatusInput.active;
    return newOrderStatus;
  }
}
