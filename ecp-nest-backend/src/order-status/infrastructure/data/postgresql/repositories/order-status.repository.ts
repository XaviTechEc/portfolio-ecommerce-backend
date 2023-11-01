import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { IGenericArgs } from 'src/common/domain/dtos/graphql/args';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { IOrderStatusRepository } from 'src/order-status/domain/abstracts/repositories/order-status.repository';
import {
  CreateOrderStatusInput,
  UpdateOrderStatusInput,
} from 'src/order-status/domain/dtos/graphql/inputs/order-status.input';
import { Repository, FindManyOptions } from 'typeorm';
import { OrderStatus } from '../entities/OrderStatus.entity';
import { GetAllGenericResponse } from 'src/common/domain/interfaces/responses/get-all-generic-response.interface';
import { getPageCount } from 'src/common/infrastructure/helpers/get-page-count.helper';

const CONTEXT = 'OrderStatusRepository';

export class OrderStatusRepository
  implements IOrderStatusRepository<OrderStatus>
{
  private _repository: Repository<OrderStatus>;
  private _loggerService: ILoggerService;
  private _exceptionsService: IExceptionsService;

  constructor(
    repository: Repository<OrderStatus>,
    loggerService: ILoggerService,
    exceptionsService: IExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }

  async getAllOrderStatus(
    args?: IGenericArgs<OrderStatus>,
  ): Promise<GetAllGenericResponse<OrderStatus>> {
    try {
      let queryOptions: FindManyOptions<OrderStatus> = {};
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

  async getOrderStatusById(id: string): Promise<OrderStatus> {
    try {
      const orderStatus = await this._repository.findOneBy({ id });
      if (!orderStatus) {
        return this._exceptionsService.notFound({
          message: `The order status with id ${id} could not be found`,
        });
      }
      return orderStatus;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async createOrderStatus(
    createOrderStatusInput: CreateOrderStatusInput,
  ): Promise<OrderStatus> {
    try {
      const newOrderStatus = this._repository.create({
        ...createOrderStatusInput,
      });
      return this._repository.save(newOrderStatus);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async updateOrderStatus(
    id: string,
    updateOrderStatusInput: UpdateOrderStatusInput,
  ): Promise<OrderStatus> {
    try {
      await this.getOrderStatusById(id);
      const newOrderStatus = await this._repository.preload({
        ...updateOrderStatusInput,
      });
      return this._repository.save(newOrderStatus);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async removeOrderStatus(id: string): Promise<OrderStatus> {
    try {
      const orderStatus = await this.getOrderStatusById(id);
      return this._repository.remove(orderStatus);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }
}
