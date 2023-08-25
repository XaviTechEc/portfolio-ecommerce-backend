import { CreateOrderLineInput, UpdateOrderLineInput } from 'src/core/dtos';
import { IOrderLine } from 'src/core/entities';

export abstract class IOrderLinesRepository {
  abstract getAllOrderLines(): Promise<IOrderLine[]>;
  abstract getAllOrderLinesBy(
    fields: Partial<IOrderLine>,
  ): Promise<IOrderLine[]>;

  abstract getOrderLineById(id: string): Promise<IOrderLine>;
  abstract getOneOrderLineBy(fields: Partial<IOrderLine>): Promise<IOrderLine>;
  abstract createOrderLine(
    createOrderLineInput: CreateOrderLineInput,
  ): Promise<IOrderLine>;
  abstract updateOrderLine(
    id: string,
    updateOrderLineInput: UpdateOrderLineInput,
  ): Promise<IOrderLine>;
  abstract removeOrderLine(id: string): Promise<IOrderLine>;
}
