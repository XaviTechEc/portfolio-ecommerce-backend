import { PaginationArgs } from './pagination.args';
import { SearchArgs } from './search.args';

export abstract class IGenericArgs<T = any> {
  paginationArgs?: PaginationArgs;
  searchArgs?: SearchArgs;
}
