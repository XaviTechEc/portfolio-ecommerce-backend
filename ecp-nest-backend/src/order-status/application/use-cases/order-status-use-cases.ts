import { Injectable } from '@nestjs/common';
import {
  GetManyProps,
  GetOneByIdProps,
  CreateProps,
  UpdateOneByIdProps,
  DeleteOneByIdProps,
} from 'src/common/domain/abstracts/generic-data-methods.repository';
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
    private dataServices: IOrderStatusDataSourceService,
    private orderStatusFactoryService: OrderStatusFactoryService,
  ) {}

  getMany(props: GetManyProps<IOrderStatus>) {
    return this.dataServices.orderStatus.getMany({ ...props });
  }

  getOneById(props: GetOneByIdProps) {
    return this.dataServices.orderStatus.getOneById({ ...props });
  }

  create(props: CreateProps<CreateOrderStatusInput>) {
    const newOrderStatus = this.orderStatusFactoryService.createOrderStatus(
      props.data,
    );
    return this.dataServices.orderStatus.create({
      ...props,
      data: newOrderStatus,
    });
  }

  updateOneById(props: UpdateOneByIdProps<UpdateOrderStatusInput>) {
    const newOrderStatus = this.orderStatusFactoryService.updateOrderStatus(
      props.data,
    );
    return this.dataServices.orderStatus.updateOneById({
      ...props,
      data: newOrderStatus,
    });
  }

  deleteOneById(props: DeleteOneByIdProps) {
    return this.dataServices.orderStatus.deleteOneById({ ...props });
  }
}
