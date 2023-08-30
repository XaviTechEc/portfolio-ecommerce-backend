import { CreateOrderStatusInput, UpdateOrderStatusInput } from 'src/core/dtos';
import { IGenericArgs } from '../../generic-args.repository';

export abstract class IOrderStatusRepository<T> {
  abstract getAllOrderStatus(args?: IGenericArgs<T>): Promise<T[]>;
  abstract getOrderStatusById(id: string): Promise<T>;
  abstract createOrderStatus(
    createOrderStatusInput: CreateOrderStatusInput,
  ): Promise<T>;
  abstract updateOrderStatus(
    id: string,
    updateOrderStatusInput: UpdateOrderStatusInput,
  ): Promise<T>;
  abstract removeOrderStatus(id: string): Promise<T>;
}
