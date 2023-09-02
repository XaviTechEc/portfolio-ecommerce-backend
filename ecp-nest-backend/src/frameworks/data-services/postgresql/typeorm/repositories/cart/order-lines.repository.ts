import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';
import { IOrderLinesRepository } from 'src/core/abstracts/repositories';
import { CreateOrderLineInput, UpdateOrderLineInput } from 'src/core/dtos';
import { Repository } from 'typeorm';
import { OrderLine } from '../../entities/outputs/entities';

export class OrderLinesRepository implements IOrderLinesRepository<OrderLine> {
  private _repository: Repository<OrderLine>;

  constructor(repository: Repository<OrderLine>) {
    this._repository = repository;
  }
  getAllOrderLines(args?: IGenericArgs<OrderLine>): Promise<OrderLine[]> {
    throw new Error('Method not implemented.');
  }
  getAllOrderLinesBy(
    fields: Partial<OrderLine>,
    args?: IGenericArgs<OrderLine>,
  ): Promise<OrderLine[]> {
    throw new Error('Method not implemented.');
  }
  getOrderLineById(id: string): Promise<OrderLine> {
    throw new Error('Method not implemented.');
  }
  getOneOrderLineBy(
    fields: Partial<OrderLine>,
    args?: IGenericArgs<OrderLine>,
  ): Promise<OrderLine> {
    throw new Error('Method not implemented.');
  }
  createOrderLine(
    createOrderLineInput: CreateOrderLineInput,
  ): Promise<OrderLine> {
    throw new Error('Method not implemented.');
  }
  updateOrderLine(
    id: string,
    updateOrderLineInput: UpdateOrderLineInput,
  ): Promise<OrderLine> {
    throw new Error('Method not implemented.');
  }
  removeOrderLine(id: string): Promise<OrderLine> {
    throw new Error('Method not implemented.');
  }
}
