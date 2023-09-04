import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';
import { IOrderStatusRepository } from 'src/core/abstracts/repositories';
import { CreateOrderStatusInput, UpdateOrderStatusInput } from 'src/core/dtos';
import { FindManyOptions, Repository } from 'typeorm';
import { OrderStatus } from '../../entities/outputs/entities';
import { LoggerService } from '@nestjs/common';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';

export class OrderStatusRepository
  implements IOrderStatusRepository<OrderStatus>
{
  private _repository: Repository<OrderStatus>;
  private _loggerService: LoggerService;
  private _exceptionsService: ExceptionsService;

  constructor(
    repository: Repository<OrderStatus>,
    loggerService: LoggerService,
    exceptionsService: ExceptionsService,
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
