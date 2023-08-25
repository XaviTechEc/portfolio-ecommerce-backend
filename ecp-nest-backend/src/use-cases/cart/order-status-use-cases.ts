import { Injectable } from '@nestjs/common';
import { IOrderStatusRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { OrderStatusFactoryService } from './factory/order-status-factory.service';
import { CreateOrderStatusInput, UpdateOrderStatusInput } from 'src/core/dtos';
import { IOrderStatus } from 'src/core/entities';

@Injectable()
export class OrderStatusUseCases implements IOrderStatusRepository {
  constructor(
    private dataService: IDataSourcesService,
    private orderStatusFactoryService: OrderStatusFactoryService,
  ) {}

  getAllOrderStatus(): Promise<IOrderStatus[]> {
    return this.dataService.orderStatus.getAll();
  }

  getOrderStatusById(id: string): Promise<IOrderStatus> {
    return this.dataService.orderStatus.getOneById(id);
  }

  createOrderStatus(
    createOrderStatusInput: CreateOrderStatusInput,
  ): Promise<IOrderStatus> {
    const orderStatus = this.orderStatusFactoryService.createOrderStatus(
      createOrderStatusInput,
    );
    return this.dataService.orderStatus.create(orderStatus);
  }

  updateOrderStatus(
    id: string,
    updateOrderStatusInput: UpdateOrderStatusInput,
  ): Promise<IOrderStatus> {
    const orderStatus = this.orderStatusFactoryService.updateOrderStatus(
      updateOrderStatusInput,
    );
    return this.dataService.orderStatus.updateOneById(id, orderStatus);
  }

  removeOrderStatus(id: string): Promise<IOrderStatus> {
    return this.dataService.orderStatus.deleteOneById(id);
  }
}
