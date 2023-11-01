import { IGenericArgs } from 'src/common/domain/dtos/graphql/args';
import {
  CreateOrderStatusInput,
  UpdateOrderStatusInput,
} from '../../dtos/graphql/inputs/order-status.input';
import { GetAllGenericResponse } from 'src/common/domain/interfaces/responses/get-all-generic-response.interface';

export abstract class IOrderStatusRepository<T> {
  abstract getAllOrderStatus(
    args?: IGenericArgs<T>,
  ): Promise<GetAllGenericResponse<T>>;
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
