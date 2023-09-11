import { Injectable } from '@nestjs/common';
import { IDataSourcesService } from 'src/common/domain/abstracts/services';
import { IGenericArgs } from 'src/common/domain/dtos/graphql/args';
import { IOrderStatusRepository } from 'src/order-status/domain/abstracts/repositories/order-status.repository';
import {
  CreateOrderStatusInput,
  UpdateOrderStatusInput,
} from 'src/order-status/domain/dtos/graphql/inputs/order-status.input';
import { IOrderStatus } from 'src/order-status/domain/entities/order-status.entity';
import { OrderStatusFactoryService } from './factory/order-status-factory.service';

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
