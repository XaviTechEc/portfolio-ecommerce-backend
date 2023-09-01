import { CreateOrderLineInput, UpdateOrderLineInput } from 'src/core/dtos';
import { IGenericArgs } from '../../../dtos/graphql/args/generic-args.repository';

export abstract class IOrderLinesRepository<T> {
  abstract getAllOrderLines(args?: IGenericArgs<T>): Promise<T[]>;
  abstract getAllOrderLinesBy(
    fields: Partial<T>,
    args: IGenericArgs<T>,
  ): Promise<T[]>;
  abstract getOrderLineById(id: string): Promise<T>;
  abstract getOneOrderLineBy(
    fields: Partial<T>,
    args: IGenericArgs<T>,
  ): Promise<T>;
  abstract createOrderLine(
    createOrderLineInput: CreateOrderLineInput,
  ): Promise<T>;
  abstract updateOrderLine(
    id: string,
    updateOrderLineInput: UpdateOrderLineInput,
  ): Promise<T>;
  abstract removeOrderLine(id: string): Promise<T>;
}
