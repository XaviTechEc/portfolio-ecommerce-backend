import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';
import { IShopOrdersRepository } from 'src/core/abstracts/repositories';
import { CreateShopOrderInput, UpdateShopOrderInput } from 'src/core/dtos';
import { FindManyOptions, Repository } from 'typeorm';
import { ShopOrder } from '../../entities/outputs/entities';
import { LoggerService } from '@nestjs/common';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';

export class ShopOrdersRepository implements IShopOrdersRepository<ShopOrder> {
  private _repository: Repository<ShopOrder>;
  private _loggerService: LoggerService;
  private _exceptionsService: ExceptionsService;

  constructor(
    repository: Repository<ShopOrder>,
    loggerService: LoggerService,
    exceptionsService: ExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }
  async getAllShopOrders(args?: IGenericArgs<ShopOrder>): Promise<ShopOrder[]> {
    let queryOptions: FindManyOptions<ShopOrder> = {};

    if (args) {
      const { paginationArgs } = args;
      if (paginationArgs) {
        const { limit = 10, offset = 0 } = paginationArgs;
        queryOptions = { take: limit, skip: offset };
      }
    }

    const shippingMethods = await this._repository.find(queryOptions);
    return shippingMethods;
  }

  async getShopOrderById(id: string): Promise<ShopOrder> {
    const shopOrder = await this._repository.findOneBy({ id });
    if (!shopOrder) {
      return this._exceptionsService.notFound({
        message: `The shop order with id ${id} could not be found`,
      });
    }
    return shopOrder;
  }

  async createShopOrder(
    createShopOrderInput: CreateShopOrderInput,
  ): Promise<ShopOrder> {
    const newShopOrder = await this._repository.create({
      ...createShopOrderInput,
    });
    return this._repository.save(newShopOrder);
  }
  async updateShopOrder(
    id: string,
    updateShopOrderInput: UpdateShopOrderInput,
  ): Promise<ShopOrder> {
    await this.getShopOrderById(id);
    const newShopOrder = await this._repository.create({
      ...updateShopOrderInput,
    });
    if (!newShopOrder) {
      return this._exceptionsService.notFound({
        message: 'The shop order could not be found',
      });
    }
    return this._repository.save(newShopOrder);
  }
  async removeShopOrder(id: string): Promise<ShopOrder> {
    const shopOrder = await this.getShopOrderById(id);
    return this._repository.save(shopOrder);
  }
}
