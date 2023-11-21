import { ICategoriesRepository } from 'src/categories/domain/abstracts/repositories/categories.repository';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { PostgresGenericRepository } from 'src/common/frameworks/data-services/postgresql/repositories/postgres-generic-repository';
import { Repository } from 'typeorm';

export class CategoriesPostgresRepository<TData = any>
  extends PostgresGenericRepository<TData>
  implements ICategoriesRepository<TData>
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
