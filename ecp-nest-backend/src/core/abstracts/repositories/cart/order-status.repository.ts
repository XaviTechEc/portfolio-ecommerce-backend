import { IOrderStatus } from 'src/core/entities';

export abstract class IOrderStatusRepository {
  abstract getAllOrderStatus(): Promise<IOrderStatus>;
  abstract getOrderStatusById(id: string): Promise<IOrderStatus>;
  abstract createOrderStatus(
    createOrderStatusInput: any,
  ): Promise<IOrderStatus>;
  abstract updateOrderStatus(
    updateOrderStatusInput: any,
  ): Promise<IOrderStatus>;
  abstract removeOrderStatus(id: string): Promise<IOrderStatus>;
}
