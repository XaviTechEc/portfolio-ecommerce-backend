import {
  IGenericArgs,
  CreateOrderLineInput,
  UpdateOrderLineInput,
  PaginationArgs,
} from 'src/core/dtos';

export abstract class IOrderLinesRepository<T> {
  abstract getAllOrderLines(args?: IGenericArgs<T>): Promise<T[]>;

  abstract getOrderLineById(id: string): Promise<T>;
  abstract createOrderLine(
    createOrderLineInput: CreateOrderLineInput,
  ): Promise<T>;
  abstract updateOrderLine(
    id: string,
    updateOrderLineInput: UpdateOrderLineInput,
  ): Promise<T>;
  abstract removeOrderLine(id: string): Promise<T>;

  abstract getOrderLinesBy(
    term: string,
    fields: (keyof T)[],
    paginationArgs: PaginationArgs,
  ): Promise<T[]>;
}
