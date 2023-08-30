import { Injectable } from '@nestjs/common';
import { IOrderLinesRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { IOrderLine } from 'src/core/entities';
import { OrderLineFactoryService } from './factory/order-line-factory.service';
import { IGenericArgs } from 'src/core/abstracts/generic-args.repository';
import { CreateOrderLineInput, UpdateOrderLineInput } from 'src/core/dtos';

@Injectable()
export class OrderLineUseCases implements IOrderLinesRepository<IOrderLine> {
  constructor(
    private dataService: IDataSourcesService,
    private orderLineFactoryService: OrderLineFactoryService,
  ) {}
  getAllOrderLines(args?: IGenericArgs<IOrderLine>): Promise<IOrderLine[]> {
    throw new Error('Method not implemented.');
  }
  getAllOrderLinesBy(
    fields: Partial<IOrderLine>,
    args: IGenericArgs<IOrderLine>,
  ): Promise<IOrderLine[]> {
    throw new Error('Method not implemented.');
  }
  getOrderLineById(id: string): Promise<IOrderLine> {
    throw new Error('Method not implemented.');
  }
  getOneOrderLineBy(
    fields: Partial<IOrderLine>,
    args: IGenericArgs<IOrderLine>,
  ): Promise<IOrderLine> {
    throw new Error('Method not implemented.');
  }
  createOrderLine(
    createOrderLineInput: CreateOrderLineInput,
  ): Promise<IOrderLine> {
    throw new Error('Method not implemented.');
  }
  updateOrderLine(
    id: string,
    updateOrderLineInput: UpdateOrderLineInput,
  ): Promise<IOrderLine> {
    throw new Error('Method not implemented.');
  }
  removeOrderLine(id: string): Promise<IOrderLine> {
    throw new Error('Method not implemented.');
  }
}
