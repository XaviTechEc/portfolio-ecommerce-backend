import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { PostgresGenericRepository } from 'src/common/frameworks/data-services/postgresql/repositories/postgres-generic-repository';
import { IShoppingCartProductItemsRepository } from 'src/shopping-cart-product-items/domain/abstracts/repositories/shopping-cart-product-item.repository';
import { Repository } from 'typeorm';

export class ShoppingCartProductItemsPostgresRepository<TData>
  extends PostgresGenericRepository<TData>
  implements IShoppingCartProductItemsRepository<TData>
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
