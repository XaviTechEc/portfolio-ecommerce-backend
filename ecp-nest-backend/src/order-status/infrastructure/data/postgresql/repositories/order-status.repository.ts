import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { PostgresGenericRepository } from 'src/common/frameworks/data-services/postgresql/repositories/postgres-generic-repository';
import { IOrderStatusRepository } from 'src/order-status/domain/abstracts/repositories/order-status.repository';
import { Repository } from 'typeorm';

export class OrderStatusPostgresRepository<TData>
  extends PostgresGenericRepository<TData>
  implements IOrderStatusRepository<TData>
{
  constructor(
    repository: Repository<TData>,
    loggerService: ILoggerService,
    exceptionsService: IExceptionsService,
    context: string,
    tableAlias: string,
  ) {
    super(repository, loggerService, exceptionsService, context, tableAlias);
  }

  // Add your custom logic here ↓↓↓
}
