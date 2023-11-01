import { Injectable } from '@nestjs/common';
import {
  IGenericArgs,
  PaginationArgs,
} from 'src/common/domain/dtos/graphql/args';
import { IOrderLinesDataSourceService } from 'src/order-lines/domain/abstracts/services/order-lines-datasource.abstract.service';
import {
  CreateOrderLineInput,
  UpdateOrderLineInput,
} from 'src/order-lines/domain/dtos/graphql/inputs/order-line.input';
import { IOrderLine } from 'src/order-lines/domain/entities/order-line.entity';
import { OrderLineFactoryService } from './factory/order-line-factory.service';

@Injectable()
export class OrderLineUseCases {
  constructor(
    private dataService: IOrderLinesDataSourceService,
    private orderLineFactoryService: OrderLineFactoryService,
  ) {}
  getOrderLinesBy(
    term: string,
    fields: (keyof IOrderLine)[],
    paginationArgs: PaginationArgs,
  ) {
    return this.dataService.orderLines.getOrderLinesBy(
      term,
      fields,
      paginationArgs,
    );
  }
  getAllOrderLines(args?: IGenericArgs<IOrderLine>) {
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
