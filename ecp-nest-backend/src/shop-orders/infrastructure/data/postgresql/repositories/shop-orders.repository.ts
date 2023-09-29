import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import {
  PaginationArgs,
  IGenericArgs,
} from 'src/common/domain/dtos/graphql/args';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { IShopOrdersRepository } from 'src/shop-orders/domain/abstracts/repositories/shop-orders.repository';
import {
  CreateShopOrderInput,
  UpdateShopOrderInput,
} from 'src/shop-orders/domain/dtos/graphql/inputs/shop-order.input';
import {
  Repository,
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  ILike,
} from 'typeorm';
import { ShopOrder } from '../entities/ShopOrder.entity';

const CONTEXT = 'ShopOrdersRepository';

export class ShopOrdersRepository implements IShopOrdersRepository<ShopOrder> {
  private _repository: Repository<ShopOrder>;
  private _loggerService: ILoggerService;
  private _exceptionsService: IExceptionsService;

  constructor(
    repository: Repository<ShopOrder>,
    loggerService: ILoggerService,
    exceptionsService: IExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }
  async getShopOrdersBy(
    term: any,
    fields: (keyof ShopOrder)[],
    paginationArgs: PaginationArgs,
  ): Promise<ShopOrder[]> {
    try {
      let queryOptions: FindManyOptions<ShopOrder> = {};
      let relations: FindOptionsRelations<ShopOrder> = {};
      let where: FindOptionsWhere<ShopOrder> = {};

      if (paginationArgs) {
        const { limit = 10, offset = 0 } = paginationArgs;
        queryOptions = { take: limit, skip: offset };
      }

      for (const field of fields) {
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

        if (field === 'address') {
          relations = { ...relations, address: true };
          where = {
            ...where,
            address: [
              { addressLine1: ILike(`%${term}%`) },
              { addressLine2: ILike(`%${term}%`) },
              { reference: ILike(`%${term}%`) },
              { id: term },
            ],
          };
        }

        if (field === 'shippingMethod') {
          relations = { ...relations, shippingMethod: true };
          where = {
            ...where,
            shippingMethod: [{ name: ILike(`%${term}%`) }, { id: term }],
          };
        }

        if (field === 'orderStatus') {
          relations = { ...relations, orderStatus: true };
          where = {
            ...where,
            orderStatus: [{ statusValue: term }, { id: term }],
          };
        }
      }

      queryOptions = { ...queryOptions, relations, where };

      const shopOrdersBy = (await this._repository.find(queryOptions)) ?? [];
      return shopOrdersBy;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }
  async getAllShopOrders(args?: IGenericArgs<ShopOrder>): Promise<ShopOrder[]> {
    try {
      let queryOptions: FindManyOptions<ShopOrder> = {};

      if (args) {
        const { paginationArgs } = args;
        if (paginationArgs) {
          const { limit = 10, offset = 0 } = paginationArgs;
          queryOptions = { take: limit, skip: offset };
        }
      }

      const shippingMethods = (await this._repository.find(queryOptions)) ?? [];
      return shippingMethods;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async getShopOrderById(id: string): Promise<ShopOrder> {
    try {
      const shopOrder = await this._repository.findOneBy({ id });
      if (!shopOrder) {
        return this._exceptionsService.notFound({
          message: `The shop order with id ${id} could not be found`,
        });
      }
      return shopOrder;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async createShopOrder(
    createShopOrderInput: CreateShopOrderInput,
  ): Promise<ShopOrder> {
    try {
      const newShopOrder = await this._repository.create({
        ...createShopOrderInput,
      });
      return this._repository.save(newShopOrder);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async updateShopOrder(
    id: string,
    updateShopOrderInput: UpdateShopOrderInput,
  ): Promise<ShopOrder> {
    try {
      await this.getShopOrderById(id);
      const newShopOrder = await this._repository.create({
        ...updateShopOrderInput,
      });
      return this._repository.save(newShopOrder);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async removeShopOrder(id: string): Promise<ShopOrder> {
    try {
      const shopOrder = await this.getShopOrderById(id);
      return this._repository.save(shopOrder);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }
}
