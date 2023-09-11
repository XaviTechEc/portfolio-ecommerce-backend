import { LoggerService } from 'src/infrastructure/logger/logger.service';
import { IOrderLinesRepository } from 'src/core/abstracts/repositories';
import {
  CreateOrderLineInput,
  PaginationArgs,
  UpdateOrderLineInput,
} from 'src/core/dtos';
import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';
import {
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  ILike,
  Repository,
} from 'typeorm';
import { OrderLine } from '../../entities/outputs/entities';

export class OrderLinesRepository implements IOrderLinesRepository<OrderLine> {
  private _repository: Repository<OrderLine>;
  private _loggerService: LoggerService;
  private _exceptionsService: ExceptionsService;

  constructor(
    repository: Repository<OrderLine>,
    loggerService: LoggerService,
    exceptionsService: ExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }
  async getOrderLinesBy(
    term: string,
    fields: (keyof OrderLine)[],
    paginationArgs: PaginationArgs,
  ): Promise<OrderLine[]> {
    let queryOptions: FindManyOptions<OrderLine> = {};
    let relations: FindOptionsRelations<OrderLine> = {};
    let where: FindOptionsWhere<OrderLine> = {};

    if (paginationArgs) {
      const { limit = 10, offset = 0 } = paginationArgs;
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

    const orderLinesBy = await this._repository.find(queryOptions);
    return orderLinesBy;
  }
  async getAllOrderLines(args?: IGenericArgs<OrderLine>): Promise<OrderLine[]> {
    let queryOptions: FindManyOptions<OrderLine> = {};

    if (args) {
      const { paginationArgs } = args;
      if (paginationArgs) {
        const { limit = 10, offset = 0 } = paginationArgs;
        queryOptions = { take: limit, skip: offset };
      }
    }

    const orderLines = await this._repository.find(queryOptions);
    return orderLines;
  }

  async getOrderLineById(id: string): Promise<OrderLine> {
    const orderLine = await this._repository.findOneBy({ id });
    if (!orderLine) {
      return this._exceptionsService.notFound({
        message: `Order line with id ${id} could not be found`,
      });
    }
    return orderLine;
  }

  async createOrderLine(
    createOrderLineInput: CreateOrderLineInput,
  ): Promise<OrderLine> {
    const newOrderLine = this._repository.create({ ...createOrderLineInput });
    return this._repository.save(newOrderLine);
  }

  async updateOrderLine(
    id: string,
    updateOrderLineInput: UpdateOrderLineInput,
  ): Promise<OrderLine> {
    await this.getOrderLineById(id);
    const newOrderLine = await this._repository.preload({
      ...updateOrderLineInput,
    });
    if (!newOrderLine) {
      return this._exceptionsService.internalServerError({
        message: 'This order line could not be preloaded',
      });
    }
    return this._repository.save(newOrderLine);
  }

  async removeOrderLine(id: string): Promise<OrderLine> {
    const orderLine = await this.getOrderLineById(id);
    return this._repository.remove(orderLine);
  }
}
