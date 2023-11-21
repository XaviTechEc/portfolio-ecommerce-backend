import {
  CreateProps,
  DeleteOneByIdProps,
  GetManyProps,
  GetOneByIdProps,
  IGenericDataRepository,
  RestoreOneByIdProps,
  UpdateOneByIdProps,
} from 'src/common/domain/abstracts/generic-data-methods.repository';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import {
  ICustomGenericResponse,
  ICustomGenericResponseWithPagination,
  IPagination,
} from 'src/common/domain/interfaces/responses/custom-generic-response.interface';
import { getSlugFromText } from 'src/common/domain/utils/get-slug-from-text.util';
import { getCurrentPage } from 'src/common/infrastructure/helpers/get-current-page.helper';
import { getPageCount } from 'src/common/infrastructure/helpers/get-page-count.helper';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';

export class PostgresGenericRepository<TData>
  implements IGenericDataRepository<TData>
{
  constructor(
    protected _repository: Repository<TData>,
    protected _loggerService: ILoggerService,
    protected _exceptionsService: IExceptionsService,
    protected _context: string,
    protected _tableAlias: string,
  ) {}

  async getMany({
    args,
    user,
  }: GetManyProps<TData>): Promise<
    ICustomGenericResponseWithPagination<TData>
  > {
    try {
      const { paginationArgs, searchArgs, orderArgs } = args;
      const { limit = 10, offset = 0 } = paginationArgs;
      const { term: searchTerm, fields = [] } = searchArgs;

      const alias = getSlugFromText(this._tableAlias);
      let qb: SelectQueryBuilder<TData>;
      let pagination = {} as IPagination;

      qb = this._repository
        .createQueryBuilder(`${alias}`)
        .where(`${alias}.created_by = :uid`, { uid: user.id });

      if (searchTerm) {
        qb = qb.andWhere(
          new Brackets((qb) => {
            for (const field of fields) {
              const aliasField = `${alias}.${String(field)}`;
              qb.orWhere(`${aliasField} ILIKE :term`, { term: searchTerm });
            }
          }),
        );
      }

      qb = qb.take(limit).skip(offset);
      pagination = {
        ...pagination,
        page: getCurrentPage(offset, limit),
      };

      if (orderArgs) {
        let orderCriteriaObj = {};
        for (const orderField of orderArgs) {
          const { field, order } = orderField;
          const aliasField = `${alias}.${String(field)}`;
          orderCriteriaObj = {
            ...orderCriteriaObj,
            [aliasField]: order,
          };
        }
        qb = qb.orderBy(orderCriteriaObj);
      }

      const [data, total] = await qb.getManyAndCount();

      pagination = {
        ...pagination,
        total,
        pageCount: getPageCount(total, limit),
      };

      return {
        success: true,
        data,
        pagination,
      };
    } catch (error) {
      this._exceptionsService.handler(error, this._context);
    }
  }

  async getOneById({
    id,
    user,
  }: GetOneByIdProps): Promise<ICustomGenericResponse<TData>> {
    try {
      const alias = getSlugFromText(this._tableAlias);

      const storeFound = await this._repository
        .createQueryBuilder(`${alias}`)
        .where(`${alias}.created_by = :uid`)
        .andWhere(`${alias}.id = :id`)
        .setParameters({
          id,
          uid: user.id,
        })
        .getOne();

      if (!storeFound) {
        this._exceptionsService.notFound({
          message: `Element with id ${id} could not be found`,
        });
      }
      return { success: true, data: storeFound };
    } catch (error) {
      this._exceptionsService.handler(error, this._context);
    }
  }

  async create({
    data,
    user,
  }: CreateProps<TData>): Promise<ICustomGenericResponse<TData>> {
    try {
      const newElement = this._repository.create({ ...data, user });
      const createdElement = await this._repository.save(newElement);
      return { success: true, data: createdElement };
    } catch (error) {
      this._exceptionsService.handler(error, this._context);
    }
  }

  async updateOneById({
    id,
    data,
    user,
  }: UpdateOneByIdProps<TData>): Promise<ICustomGenericResponse<TData>> {
    try {
      await this.getOneById({ id, user });
      const newStore = await this._repository.preload({
        ...data,
        updatedBy: user.id,
      });
      const updatedStore = await this._repository.save(newStore);
      return { success: true, data: updatedStore };
    } catch (error) {
      this._exceptionsService.handler(error, this._context);
    }
  }

  async deleteOneById({
    id,
    user,
  }: DeleteOneByIdProps): Promise<ICustomGenericResponse<TData>> {
    try {
      const { data: elementFound } = await this.getOneById({ id, user });
      (elementFound as any).deletedBy = user.id;
      await this._repository.save(elementFound);
      await this._repository.softDelete(id);
      return { success: true, data: elementFound };
    } catch (error) {
      this._exceptionsService.handler(error, this._context);
    }
  }

  async restoreOneById({
    id,
    user,
  }: RestoreOneByIdProps): Promise<ICustomGenericResponse<TData>> {
    try {
      await this._repository.restore(id);
      const { data: elementFound } = await this.getOneById({ id, user });
      return { success: true, data: elementFound };
    } catch (error) {
      this._exceptionsService.handler(error, this._context);
    }
  }
}
