import { PaginationArgs, SearchArgs } from 'src/common/graphql/args';

export abstract class IGenericArgs<T> {
  paginationArgs?: PaginationArgs;
  searchArgs?: SearchArgs<T>;
}
