import { IGenericArgs } from 'src/core/abstracts/generic-args.repository';
import { IOrderStatusRepository } from 'src/core/abstracts/repositories';
import { CreateOrderStatusInput, UpdateOrderStatusInput } from 'src/core/dtos';
import { Repository } from 'typeorm';

export class OrderStatusRepository<T> implements IOrderStatusRepository<T> {
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }

  getAllOrderStatus(args?: IGenericArgs<T>): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  getOrderStatusById(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
  createOrderStatus(
    createOrderStatusInput: CreateOrderStatusInput,
  ): Promise<T> {
    throw new Error('Method not implemented.');
  }
  updateOrderStatus(
    id: string,
    updateOrderStatusInput: UpdateOrderStatusInput,
  ): Promise<T> {
    throw new Error('Method not implemented.');
  }
  removeOrderStatus(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
}
