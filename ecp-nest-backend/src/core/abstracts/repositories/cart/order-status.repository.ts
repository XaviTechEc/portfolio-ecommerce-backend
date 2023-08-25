import { CreateOrderStatusInput, UpdateOrderStatusInput } from 'src/core/dtos';
import { IOrderStatus } from 'src/core/entities';

export abstract class IOrderStatusRepository {
  abstract getAllOrderStatus(): Promise<IOrderStatus[]>;
  abstract getOrderStatusById(id: string): Promise<IOrderStatus>;
  abstract createOrderStatus(
    createOrderStatusInput: CreateOrderStatusInput,
  ): Promise<IOrderStatus>;
  abstract updateOrderStatus(
    id: string,
    updateOrderStatusInput: UpdateOrderStatusInput,
  ): Promise<IOrderStatus>;
  abstract removeOrderStatus(id: string): Promise<IOrderStatus>;
}
