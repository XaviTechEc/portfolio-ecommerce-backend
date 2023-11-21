import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { PostgresGenericRepository } from 'src/common/frameworks/data-services/postgresql/repositories/postgres-generic-repository';
import { IUserAddressesRepository } from 'src/user-addresses/domain/abstracts/repositories/user-addresses.repository';
import { Repository } from 'typeorm';

export class UserAddressesPostgresRepository<TData>
  extends PostgresGenericRepository<TData>
  implements IUserAddressesRepository<TData>
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
