import { Injectable } from '@nestjs/common';
import { IOrderStatusRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { OrderStatusFactoryService } from './factory/order-status-factory.service';
import { CreateOrderStatusInput, UpdateOrderStatusInput } from 'src/core/dtos';
import { IOrderStatus } from 'src/core/entities';
import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';

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
    return this.dataService.orderStatus.getAllOrderStatus(args);
  }
  getOrderStatusById(id: string): Promise<IOrderStatus> {
    return this.dataService.orderStatus.getOrderStatusById(id);
  }
  createOrderStatus(
    createOrderStatusInput: CreateOrderStatusInput,
  ): Promise<IOrderStatus> {
    const orderStatus = this.orderStatusFactoryService.createOrderStatus(
      createOrderStatusInput,
    );
    return this.dataService.orderStatus.createOrderStatus(orderStatus);
  }
  updateOrderStatus(
    id: string,
    updateOrderStatusInput: UpdateOrderStatusInput,
  ): Promise<IOrderStatus> {
    const orderStatus = this.orderStatusFactoryService.updateOrderStatus(
      updateOrderStatusInput,
    );
    return this.dataService.orderStatus.updateOrderStatus(id, orderStatus);
  }
  removeOrderStatus(id: string): Promise<IOrderStatus> {
    return this.dataService.orderStatus.removeOrderStatus(id);
  }
}
