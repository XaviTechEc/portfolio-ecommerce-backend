import { Injectable } from '@nestjs/common';
import {
  GetManyProps,
  GetOneByIdProps,
  CreateProps,
  UpdateOneByIdProps,
  DeleteOneByIdProps,
} from 'src/common/domain/abstracts/generic-data-methods.repository';
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
    private dataServices: IOrderLinesDataSourceService,
    private orderLineFactoryService: OrderLineFactoryService,
  ) {}

  getMany(props: GetManyProps<IOrderLine>) {
    return this.dataServices.orderLines.getMany({ ...props });
  }

  getOneById(props: GetOneByIdProps) {
    return this.dataServices.orderLines.getOneById({ ...props });
  }

  create(props: CreateProps<CreateOrderLineInput>) {
    const newOrderLine = this.orderLineFactoryService.createOrderLine(
      props.data,
    );
    return this.dataServices.orderLines.create({
      ...props,
      data: newOrderLine,
    });
  }

  updateOneById(props: UpdateOneByIdProps<UpdateOrderLineInput>) {
    const newOrderLine = this.orderLineFactoryService.updateOrderLine(
      props.data,
    );
    return this.dataServices.orderLines.updateOneById({
      ...props,
      data: newOrderLine,
    });
  }

  deleteOneById(props: DeleteOneByIdProps) {
    return this.dataServices.orderLines.deleteOneById({ ...props });
  }
}
