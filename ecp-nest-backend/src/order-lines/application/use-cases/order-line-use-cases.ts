import { Injectable } from '@nestjs/common';
import { IDataSourcesService } from 'src/common/domain/abstracts/services';
import {
  PaginationArgs,
  IGenericArgs,
} from 'src/common/domain/dtos/graphql/args';
import { IOrderLinesRepository } from 'src/order-lines/domain/abstracts/repositories/order-lines.repository';
import {
  CreateOrderLineInput,
  UpdateOrderLineInput,
} from 'src/order-lines/domain/dtos/graphql/inputs/order-line.input';
import { IOrderLine } from 'src/order-lines/domain/entities/order-line.entity';
import { OrderLineFactoryService } from './factory/order-line-factory.service';

@Injectable()
export class OrderLineUseCases implements IOrderLinesRepository<IOrderLine> {
  constructor(
    private dataService: IDataSourcesService,
    private orderLineFactoryService: OrderLineFactoryService,
  ) {}
  getOrderLinesBy(
    term: string,
    fields: (keyof IOrderLine)[],
    paginationArgs: PaginationArgs,
  ): Promise<IOrderLine[]> {
    return this.dataService.orderLines.getOrderLinesBy(
      term,
      fields,
      paginationArgs,
    );
  }
  getAllOrderLines(args?: IGenericArgs<IOrderLine>): Promise<IOrderLine[]> {
    return this.dataService.orderLines.getAllOrderLines(args);
  }

  getOrderLineById(id: string): Promise<IOrderLine> {
    return this.dataService.orderLines.getOrderLineById(id);
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
