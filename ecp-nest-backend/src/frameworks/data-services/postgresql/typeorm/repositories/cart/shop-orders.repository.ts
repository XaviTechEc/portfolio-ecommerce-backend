import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';
import { IShopOrdersRepository } from 'src/core/abstracts/repositories';
import { CreateShopOrderInput, UpdateShopOrderInput } from 'src/core/dtos';
import { Repository } from 'typeorm';
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
    let qb = this._repository.createQueryBuilder('shopOrders');
    if (args) {
      const { paginationArgs, searchArgs } = args;

      if (paginationArgs) {
        const { limit = 10, offset = 0 } = paginationArgs;
        qb = qb.take(limit).skip(offset);
      }

      if (searchArgs) {
        const { searchTerm, searchFields } = searchArgs;

        if (searchTerm) {
          if (searchTerm.trim.length === 0) return;
          if (!searchFields || searchFields.length === 0) {
            return this._exceptionsService.badRequest({
              message: 'Search fields are required',
              code_error: 404,
            });
          }

          // Joins
          qb = qb.where({});
          // TODO: Joins and search fields
        }
      }

      const shopOrdersFound = await qb.getMany();
      return shopOrdersFound;
    }
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
