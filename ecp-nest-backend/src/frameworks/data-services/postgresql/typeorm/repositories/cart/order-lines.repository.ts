import { IGenericArgs } from 'src/core/abstracts/generic-args.repository';
import { IOrderLinesRepository } from 'src/core/abstracts/repositories';
import { CreateOrderLineInput, UpdateOrderLineInput } from 'src/core/dtos';
import { Repository } from 'typeorm';

export class OrderLinesRepository<T> implements IOrderLinesRepository<T> {
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }

  getAllOrderLines(args?: IGenericArgs<T>): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  getAllOrderLinesBy(fields: Partial<T>, args?: IGenericArgs<T>): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  getOrderLineById(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
  getOneOrderLineBy(fields: Partial<T>, args?: IGenericArgs<T>): Promise<T> {
    throw new Error('Method not implemented.');
  }
  createOrderLine(createOrderLineInput: CreateOrderLineInput): Promise<T> {
    throw new Error('Method not implemented.');
  }
  updateOrderLine(
    id: string,
    updateOrderLineInput: UpdateOrderLineInput,
  ): Promise<T> {
    throw new Error('Method not implemented.');
  }
  removeOrderLine(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
}
