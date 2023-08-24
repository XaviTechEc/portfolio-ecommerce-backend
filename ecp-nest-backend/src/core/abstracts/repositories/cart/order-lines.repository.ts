import { IOrderLine } from 'src/core/entities';

export abstract class IOrderLinesRepository {
  abstract getAllOrderLines(): Promise<IOrderLine[]>;
  abstract getAllOrderLinesBy(
    fields: Partial<IOrderLine>,
  ): Promise<IOrderLine[]>;

  abstract getOrderLineById(id: string): Promise<IOrderLine>;
  abstract getOneOrderLineBy(fields: Partial<IOrderLine>): Promise<IOrderLine>;
  abstract createOrderLine(createOrderLineInput: any): Promise<IOrderLine>;
  abstract updateOrderLine(updateOrderLineInput: any): Promise<IOrderLine>;
  abstract removeOrderLine(id: string): Promise<IOrderLine>;
}
