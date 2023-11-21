import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { Repository } from 'typeorm';
import { OrderLine } from './postgresql/entities/OrderLine.entity';
import { OrderLinesPostgresRepository } from './postgresql/repositories/order-lines.repository';
import { IOrderLinesDataSourceService } from 'src/order-lines/domain/abstracts/services/order-lines-datasource.abstract.service';

@Injectable()
export class OrderLinesDataService
  implements IOrderLinesDataSourceService, OnApplicationBootstrap
{
  orderLines: OrderLinesPostgresRepository<OrderLine>;

  constructor(
    @InjectRepository(OrderLine)
    private orderLinesPostgresRepository: Repository<OrderLine>,
    private _loggerService: ILoggerService,
    private _exceptionsService: IExceptionsService,
  ) {}

  onApplicationBootstrap() {
    this.orderLines = new OrderLinesPostgresRepository(
      this.orderLinesPostgresRepository,
      this._loggerService,
      this._exceptionsService,
      this.constructor.name,
      'orderLine',
    );
  }
}
