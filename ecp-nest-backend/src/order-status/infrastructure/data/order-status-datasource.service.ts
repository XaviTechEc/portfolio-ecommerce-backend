import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderStatus } from './postgresql/entities/OrderStatus.entity';
import { OrderStatusRepository } from './postgresql/repositories/order-status.repository';
import { ExceptionsService } from 'src/common/infrastructure/exceptions/exceptions.service';
import { MyLoggerService } from 'src/common/infrastructure/logger/logger.service';

@Injectable()
export class OrderStatusDataService implements OnApplicationBootstrap {
  orderStatus: OrderStatusRepository;

  constructor(
    @InjectRepository(OrderStatus)
    private orderStatusRepository: Repository<OrderStatus>,
    private _loggerService: MyLoggerService,
    private _exceptionsService: ExceptionsService,
  ) {}

  onApplicationBootstrap() {
    this.orderStatus = new OrderStatusRepository(
      this.orderStatusRepository,
      this._loggerService,
      this._exceptionsService,
    );
  }
}
