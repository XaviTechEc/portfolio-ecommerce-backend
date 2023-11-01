import { Injectable } from '@nestjs/common';
import { IGenericArgs } from 'src/common/domain/dtos/graphql/args';
import { IOrderStatusDataSourceService } from 'src/order-status/domain/abstracts/services/order-status-datasource.abstract.service';
import {
  CreateOrderStatusInput,
  UpdateOrderStatusInput,
} from 'src/order-status/domain/dtos/graphql/inputs/order-status.input';
import { IOrderStatus } from 'src/order-status/domain/entities/order-status.entity';
import { OrderStatusFactoryService } from './factory/order-status-factory.service';

@Injectable()
export class OrderStatusUseCases {
  constructor(
    private dataService: IOrderStatusDataSourceService,
    private orderStatusFactoryService: OrderStatusFactoryService,
  ) {}
  getAllOrderStatus(args?: IGenericArgs<IOrderStatus>) {
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
