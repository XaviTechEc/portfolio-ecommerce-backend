import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';
import { IOrderStatusRepository } from 'src/core/abstracts/repositories';
import { CreateOrderStatusInput, UpdateOrderStatusInput } from 'src/core/dtos';
import { Repository } from 'typeorm';
import { OrderStatus } from '../../entities/outputs/entities';

export class OrderStatusRepository
  implements IOrderStatusRepository<OrderStatus>
{
  private _repository: Repository<OrderStatus>;

  constructor(repository: Repository<OrderStatus>) {
    this._repository = repository;
  }
  getAllOrderStatus(args?: IGenericArgs<OrderStatus>): Promise<OrderStatus[]> {
    throw new Error('Method not implemented.');
  }
  getOrderStatusById(id: string): Promise<OrderStatus> {
    throw new Error('Method not implemented.');
  }
  createOrderStatus(
    createOrderStatusInput: CreateOrderStatusInput,
  ): Promise<OrderStatus> {
    throw new Error('Method not implemented.');
  }
  updateOrderStatus(
    id: string,
    updateOrderStatusInput: UpdateOrderStatusInput,
  ): Promise<OrderStatus> {
    throw new Error('Method not implemented.');
  }
  removeOrderStatus(id: string): Promise<OrderStatus> {
    throw new Error('Method not implemented.');
  }
}
