import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExceptionsService } from 'src/common/infrastructure/exceptions/exceptions.service';
import { MyLoggerService } from 'src/common/infrastructure/logger/logger.service';
import { Repository } from 'typeorm';
import { OrderLine } from './postgresql/entities/OrderLine.entity';
import { OrderLinesRepository } from './postgresql/repositories/order-lines.repository';
import { IOrderLinesDataSourceService } from 'src/order-lines/domain/abstracts/services/order-lines-datasource.abstract.service';

@Injectable()
export class OrderLinesDataService
  implements IOrderLinesDataSourceService, OnApplicationBootstrap
{
  orderLines: OrderLinesRepository;

  constructor(
    @InjectRepository(OrderLine)
    private orderLinesRepository: Repository<OrderLine>,
    private _loggerService: MyLoggerService,
    private _exceptionsService: ExceptionsService,
  ) {}

  onApplicationBootstrap() {
    this.orderLines = new OrderLinesRepository(
      this.orderLinesRepository,
      this._loggerService,
      this._exceptionsService,
    );
  }
}
