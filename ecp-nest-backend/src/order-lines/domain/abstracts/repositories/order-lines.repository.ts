import {
  IGenericArgs,
  PaginationArgs,
} from 'src/common/domain/dtos/graphql/args';
import {
  CreateOrderLineInput,
  UpdateOrderLineInput,
} from '../../dtos/graphql/inputs/order-line.input';
import { GetAllGenericResponse } from 'src/common/domain/interfaces/responses/get-all-generic-response.interface';

export abstract class IOrderLinesRepository<T> {
  abstract getAllOrderLines(
    args?: IGenericArgs<T>,
  ): Promise<GetAllGenericResponse<T>>;

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
  ): Promise<GetAllGenericResponse<T>>;
}
