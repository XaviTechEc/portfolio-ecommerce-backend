import { Injectable } from '@nestjs/common';
import { IOrderLinesRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { IOrderLine } from 'src/core/entities';
import { OrderLineFactoryService } from './factory/order-line-factory.service';

@Injectable()
export class OrderLineUseCases implements IOrderLinesRepository {
  constructor(
    private dataService: IDataSourcesService,
    private orderLineFactoryService: OrderLineFactoryService,
  ) {}
  getAllOrderLines(): Promise<IOrderLine[]> {
    return this.dataService.orderLines.getAll();
  }
  getAllOrderLinesBy(fields: Partial<IOrderLine>): Promise<IOrderLine[]> {
    return this.dataService.orderLines.getAllBy(fields);
  }
  getOrderLineById(id: string): Promise<IOrderLine> {
    return this.dataService.orderLines.getOneById(id);
  }
  getOneOrderLineBy(fields: Partial<IOrderLine>): Promise<IOrderLine> {
    return this.dataService.orderLines.getOneBy(fields);
  }
  createOrderLine(createOrderLineInput: any): Promise<IOrderLine> {
    const orderLine =
      this.orderLineFactoryService.createOrderLine(createOrderLineInput);
    return this.dataService.orderLines.create(orderLine);
  }
  updateOrderLine(id: string, updateOrderLineInput: any): Promise<IOrderLine> {
    const orderLine =
      this.orderLineFactoryService.updateOrderLine(updateOrderLineInput);
    return this.dataService.orderLines.updateOneById(id, orderLine);
  }
  removeOrderLine(id: string): Promise<IOrderLine> {
    return this.dataService.orderLines.deleteOneById(id);
  }
}
