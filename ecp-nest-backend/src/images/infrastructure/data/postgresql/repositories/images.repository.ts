import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { PaginationArgs } from 'src/common/domain/dtos/graphql/args';
import { ICustomGenericResponseWithPagination } from 'src/common/domain/interfaces/responses/custom-generic-response.interface';
import { PostgresGenericRepository } from 'src/common/frameworks/data-services/postgresql/repositories/postgres-generic-repository';
import { getCurrentPage } from 'src/common/infrastructure/helpers/get-current-page.helper';
import { getPageCount } from 'src/common/infrastructure/helpers/get-page-count.helper';
import { IImageRepository } from 'src/images/domain/abstracts/repositories/image.repository';
import {
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  ILike,
  Repository,
} from 'typeorm';

const CONTEXT = 'ImagesRepository';

export class ImagesRepository<TData>
  extends PostgresGenericRepository<TData>
  implements IImageRepository<TData>
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

  async getImagesBy(
    term: string,
    fields: (keyof TData)[],
    paginationArgs: PaginationArgs,
  ): Promise<ICustomGenericResponseWithPagination<TData>> {
    try {
      let queryOptions: FindManyOptions<TData> = {};
      let relations: FindOptionsRelations<TData> = {};
      let where: FindOptionsWhere<TData> = {};
      let _limit;
      let _offset;

      if (paginationArgs) {
        const { limit = 10, offset = 0 } = paginationArgs;
        _limit = limit;
        _offset = offset;
        queryOptions = { take: limit, skip: offset };
      }

      for (const field of fields) {
        if (field === 'product') {
          relations = { ...relations, product: true };
          where = {
            ...where,
            product: [
              { title: ILike(`%${term}%`) },
              { subtitle: ILike(`%${term}%`) },
              { description: ILike(`%${term}%`) },
              { id: term },
            ],
          };
        }

        if (field === 'productItem') {
          relations = { ...relations, productItem: true };
          where = {
            ...where,
            productItem: [
              { sku: ILike(`%${term}%`) },
              { slug: ILike(`%${term}%`) },
              { id: term },
            ],
          };
        }

        if (field === 'category') {
          relations = { ...relations, category: true };
          where = {
            ...where,
            category: [
              { name: ILike(`%${term}%`) },
              { description: ILike(`%${term}%`) },
              { id: term },
            ],
          };
        }

        if (field === 'user') {
          relations = { ...relations, user: true };
          where = {
            ...where,
            user: [
              { username: ILike(`%${term}%`) },
              { email: ILike(`%${term}%`) },
              { fullName: ILike(`%${term}%`) },
              { id: term },
            ],
          };
        }
      }

      queryOptions = { ...queryOptions, relations, where };

      const [data, total] = await this._repository.findAndCount(queryOptions);
      return {
        success: true,
        data,
        pagination: {
          total,
          page: getCurrentPage(_limit, _offset),
          pageCount: getPageCount(total, _limit),
        },
      };
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }
}
