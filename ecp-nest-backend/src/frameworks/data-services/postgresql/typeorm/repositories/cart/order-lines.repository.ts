import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';
import { IOrderLinesRepository } from 'src/core/abstracts/repositories';
import { CreateOrderLineInput, UpdateOrderLineInput } from 'src/core/dtos';
import { FindManyOptions, Repository, SelectQueryBuilder } from 'typeorm';
import { OrderLine } from '../../entities/outputs/entities';
import { LoggerService } from '@nestjs/common';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';

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

  async getAllOrderLinesBy(
    fields: Partial<OrderLine>,
    args?: IGenericArgs<OrderLine>,
  ): Promise<OrderLine[]> {
    const query = this._findOrdersByQuery(fields, args);
    const orderLinesFound = await query.getMany();
    return orderLinesFound;
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

  async getOneOrderLineBy(
    fields: Partial<OrderLine>,
    args?: IGenericArgs<OrderLine>,
  ): Promise<OrderLine> {
    const query = this._findOrdersByQuery(fields, args);
    const orderLineFound = await query.getOne();
    return orderLineFound;
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

  private _findOrdersByQuery(
    fields?: Partial<OrderLine>,
    args?: IGenericArgs<OrderLine>,
  ): SelectQueryBuilder<OrderLine> {
    let qb = this._repository.createQueryBuilder('orderLine');
    if (fields) {
      qb = qb.where({ ...fields });
    }

    // TODO: Change this impl
    if (args) {
      const { searchArgs, paginationArgs } = args;

      if (paginationArgs) {
        const { limit = 10, offset = 0 } = paginationArgs;
        qb = qb.take(limit).skip(offset);
      }

      if (searchArgs) {
        const { searchTerm, searchFields } = searchArgs;

        qb = qb
          .leftJoin('orderLine.product_item_id', 'product_item')
          .leftJoin('orderLine.shop_order_id', 'shop_order');

        searchFields.forEach((sf) => {
          if (sf === 'product_item.sku') {
            qb = qb.andWhere('product_item.sku ILIKE LOWER(:sku)', {
              sku: `%${searchTerm}%`,
            });
          }

          if (sf === 'product_item.slug') {
            qb = qb.andWhere('product_item.slug ILIKE LOWER(:slug)', {
              slug: `%${searchTerm}%`,
            });
          }
        });
      }
    }

    return qb;
  }
}
