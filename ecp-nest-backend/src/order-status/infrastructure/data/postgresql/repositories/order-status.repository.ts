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
  ): Promise<OrderStatus[]> {
    let queryOptions: FindManyOptions<OrderStatus> = {};
    if (args) {
      const { paginationArgs } = args;
      if (paginationArgs) {
        const { limit = 10, offset = 0 } = paginationArgs;
        queryOptions = { take: limit, skip: offset };
      }
    }
    const orderStatusFound = await this._repository.find(queryOptions);
    return orderStatusFound;
  }

  async getOrderStatusById(id: string): Promise<OrderStatus> {
    const orderStatus = await this._repository.findOneBy({ id });
    if (!orderStatus) {
      return this._exceptionsService.notFound({
        message: `The order status with id ${id} could not be found`,
      });
    }
    return orderStatus;
  }

  async createOrderStatus(
    createOrderStatusInput: CreateOrderStatusInput,
  ): Promise<OrderStatus> {
    const newOrderStatus = await this._repository.create({
      ...createOrderStatusInput,
    });
    return this._repository.save(newOrderStatus);
  }

  async updateOrderStatus(
    id: string,
    updateOrderStatusInput: UpdateOrderStatusInput,
  ): Promise<OrderStatus> {
    await this.getOrderStatusById(id);
    const newOrderStatus = await this._repository.preload({
      ...updateOrderStatusInput,
    });
    if (!newOrderStatus) {
      return this._exceptionsService.notFound({
        message: 'The order status could not be preloaded',
      });
    }
    return this._repository.save(newOrderStatus);
  }

  async removeOrderStatus(id: string): Promise<OrderStatus> {
    const orderStatus = await this.getOrderStatusById(id);
    return this._repository.remove(orderStatus);
  }
}
