import { IGenericDataRepository } from 'src/common/domain/abstracts/generic-data-methods.repository';
import {
  IGenericArgs,
  PaginationArgs,
} from 'src/common/domain/dtos/graphql/args';
import { ICustomGenericResponseWithPagination } from 'src/common/domain/interfaces/responses/custom-generic-response.interface';

export abstract class IImageRepository<
  TData,
> extends IGenericDataRepository<TData> {
  constructor() {
    super();
  }
  // Add custom logic here ↓↓↓
  abstract getImagesBy(
    term: string,
    fields: (keyof TData)[],
    paginationArgs: PaginationArgs,
  ): Promise<ICustomGenericResponseWithPagination<TData>>;
}
