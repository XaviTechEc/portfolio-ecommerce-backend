import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderStatus } from './postgresql/entities/OrderStatus.entity';
import { OrderStatusPostgresRepository } from './postgresql/repositories/order-status.repository';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { IOrderStatusDataSourceService } from 'src/order-status/domain/abstracts/services/order-status-datasource.abstract.service';

@Injectable()
export class OrderStatusDataService
  implements IOrderStatusDataSourceService, OnApplicationBootstrap
{
  orderStatus: OrderStatusPostgresRepository<OrderStatus>;

  constructor(
    @InjectRepository(OrderStatus)
    private orderStatusPostgresRepository: Repository<OrderStatus>,
    private _loggerService: ILoggerService,
    private _exceptionsService: IExceptionsService,
  ) {}

  onApplicationBootstrap() {
    this.orderStatus = new OrderStatusPostgresRepository(
      this.orderStatusPostgresRepository,
      this._loggerService,
      this._exceptionsService,
      this.constructor.name,
      'orderStatus',
    );
  }
}
