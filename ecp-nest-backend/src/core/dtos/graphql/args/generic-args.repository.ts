import { PaginationArgs } from './pagination.args';
import { SearchArgs } from './search.args';

export abstract class IGenericArgs<T> {
  paginationArgs?: PaginationArgs;
  searchArgs?: SearchArgs;
}
