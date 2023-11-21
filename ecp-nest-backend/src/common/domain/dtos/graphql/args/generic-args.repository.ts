import { OrderFieldType } from './order.args';
import { PaginationArgs } from './pagination.args';
import { SearchArgs } from './search.args';

export abstract class IGenericArgs<TData = any> {
  searchArgs: SearchArgs<TData>;
  paginationArgs: PaginationArgs;
  orderArgs?: OrderFieldType<TData>[];
}
