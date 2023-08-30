import { Injectable } from '@nestjs/common';
import { IOrderStatusRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { OrderStatusFactoryService } from './factory/order-status-factory.service';
import { CreateOrderStatusInput, UpdateOrderStatusInput } from 'src/core/dtos';
import { IOrderStatus } from 'src/core/entities';
import { IGenericArgs } from 'src/core/abstracts/generic-args.repository';

@Injectable()
export class OrderStatusUseCases
  implements IOrderStatusRepository<IOrderStatus>
{
  constructor(
    private dataService: IDataSourcesService,
    private orderStatusFactoryService: OrderStatusFactoryService,
  ) {}
  getAllOrderStatus(
    args?: IGenericArgs<IOrderStatus>,
  ): Promise<IOrderStatus[]> {
    throw new Error('Method not implemented.');
  }
  getOrderStatusById(id: string): Promise<IOrderStatus> {
    throw new Error('Method not implemented.');
  }
  createOrderStatus(
    createOrderStatusInput: CreateOrderStatusInput,
  ): Promise<IOrderStatus> {
    throw new Error('Method not implemented.');
  }
  updateOrderStatus(
    id: string,
    updateOrderStatusInput: UpdateOrderStatusInput,
  ): Promise<IOrderStatus> {
    throw new Error('Method not implemented.');
  }
  removeOrderStatus(id: string): Promise<IOrderStatus> {
    throw new Error('Method not implemented.');
  }
}
