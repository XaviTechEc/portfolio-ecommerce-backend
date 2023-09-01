import { Injectable } from '@nestjs/common';
import { IOrderLinesRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { IOrderLine } from 'src/core/entities';
import { OrderLineFactoryService } from './factory/order-line-factory.service';
import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';
import { CreateOrderLineInput, UpdateOrderLineInput } from 'src/core/dtos';

@Injectable()
export class OrderLineUseCases implements IOrderLinesRepository<IOrderLine> {
  constructor(
    private dataService: IDataSourcesService,
    private orderLineFactoryService: OrderLineFactoryService,
  ) {}
  getAllOrderLines(args?: IGenericArgs<IOrderLine>): Promise<IOrderLine[]> {
    return this.dataService.orderLines.getAllOrderLines(args);
  }
  getAllOrderLinesBy(
    fields: Partial<IOrderLine>,
    args?: IGenericArgs<IOrderLine>,
  ): Promise<IOrderLine[]> {
    return this.dataService.orderLines.getAllOrderLinesBy(fields, args);
  }
  getOrderLineById(id: string): Promise<IOrderLine> {
    return this.dataService.orderLines.getOrderLineById(id);
  }
  getOneOrderLineBy(
    fields: Partial<IOrderLine>,
    args?: IGenericArgs<IOrderLine>,
  ): Promise<IOrderLine> {
    return this.dataService.orderLines.getOneOrderLineBy(fields, args);
  }
  createOrderLine(
    createOrderLineInput: CreateOrderLineInput,
  ): Promise<IOrderLine> {
    const orderLine =
      this.orderLineFactoryService.createOrderLine(createOrderLineInput);
    return this.dataService.orderLines.createOrderLine(orderLine);
  }
  updateOrderLine(
    id: string,
    updateOrderLineInput: UpdateOrderLineInput,
  ): Promise<IOrderLine> {
    const orderLine =
      this.orderLineFactoryService.updateOrderLine(updateOrderLineInput);
    return this.dataService.orderLines.updateOrderLine(id, orderLine);
  }
  removeOrderLine(id: string): Promise<IOrderLine> {
    return this.dataService.orderLines.removeOrderLine(id);
  }
}
