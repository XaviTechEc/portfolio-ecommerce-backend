import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import {
  PaginationArgs,
  IGenericArgs,
} from 'src/common/domain/dtos/graphql/args';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { IOrderLinesRepository } from 'src/order-lines/domain/abstracts/repositories/order-lines.repository';
import {
  CreateOrderLineInput,
  UpdateOrderLineInput,
} from 'src/order-lines/domain/dtos/graphql/inputs/order-line.input';
import {
  Repository,
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  ILike,
} from 'typeorm';
import { OrderLine } from '../entities/OrderLine.entity';
import { GetAllGenericResponse } from 'src/common/domain/interfaces/responses/get-all-generic-response.interface';
import { getPageCount } from 'src/common/infrastructure/helpers/get-page-count.helper';

const CONTEXT = 'OrderLinesRepository';

export class OrderLinesRepository implements IOrderLinesRepository<OrderLine> {
  private _repository: Repository<OrderLine>;
  private _loggerService: ILoggerService;
  private _exceptionsService: IExceptionsService;

  constructor(
    repository: Repository<OrderLine>,
    loggerService: ILoggerService,
    exceptionsService: IExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }
  async getOrderLinesBy(
    term: string,
    fields: (keyof OrderLine)[],
    paginationArgs: PaginationArgs,
  ): Promise<GetAllGenericResponse<OrderLine>> {
    try {
      let queryOptions: FindManyOptions<OrderLine> = {};
      let relations: FindOptionsRelations<OrderLine> = {};
      let where: FindOptionsWhere<OrderLine> = {};
      let pageSize;

      if (paginationArgs) {
        const { limit = 10, offset = 0 } = paginationArgs;
        pageSize = limit;
        queryOptions = { take: limit, skip: offset };
      }

      for (const field of fields) {
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

        if (field === 'shopOrder') {
          relations = { ...relations, shopOrder: true };
          where = { ...where, shopOrder: { id: term } };
        }
      }

      queryOptions = { ...queryOptions, relations, where };

      const [items, total] = await this._repository.findAndCount(queryOptions);
      return { items, total, pageCount: getPageCount(total, pageSize) };
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }
  async getAllOrderLines(
    args?: IGenericArgs<OrderLine>,
  ): Promise<GetAllGenericResponse<OrderLine>> {
    try {
      let queryOptions: FindManyOptions<OrderLine> = {};
      let pageSize;

      if (args) {
        const { paginationArgs } = args;
        if (paginationArgs) {
          const { limit = 10, offset = 0 } = paginationArgs;
          pageSize = limit;
          queryOptions = { take: limit, skip: offset };
        }
      }

      const [items, total] = await this._repository.findAndCount(queryOptions);
      return { items, total, pageCount: getPageCount(total, pageSize) };
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async getOrderLineById(id: string): Promise<OrderLine> {
    try {
      const orderLine = await this._repository.findOneBy({ id });
      if (!orderLine) {
        return this._exceptionsService.notFound({
          message: `Order line with id ${id} could not be found`,
        });
      }
      return orderLine;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async createOrderLine(
    createOrderLineInput: CreateOrderLineInput,
  ): Promise<OrderLine> {
    try {
      const newOrderLine = this._repository.create({ ...createOrderLineInput });
      return this._repository.save(newOrderLine);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async updateOrderLine(
    id: string,
    updateOrderLineInput: UpdateOrderLineInput,
  ): Promise<OrderLine> {
    try {
      await this.getOrderLineById(id);
      const newOrderLine = await this._repository.preload({
        ...updateOrderLineInput,
      });
      return this._repository.save(newOrderLine);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async removeOrderLine(id: string): Promise<OrderLine> {
    try {
      const orderLine = await this.getOrderLineById(id);
      return this._repository.remove(orderLine);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }
}
