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
import { GetAllGenericResponse } from 'src/common/domain/interfaces/responses/get-all-generic-response.interface';
import { getPageCount } from 'src/common/infrastructure/helpers/get-page-count.helper';

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
  ): Promise<GetAllGenericResponse<ShopOrder>> {
    try {
      let queryOptions: FindManyOptions<ShopOrder> = {};
      let relations: FindOptionsRelations<ShopOrder> = {};
      let where: FindOptionsWhere<ShopOrder> = {};
      let pageSize;

      if (paginationArgs) {
        const { limit = 10, offset = 0 } = paginationArgs;
        pageSize = limit;
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

      const [items, total] = await this._repository.findAndCount(queryOptions);
      return { items, total, pageCount: getPageCount(total, pageSize) };
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }
  async getAllShopOrders(
    args?: IGenericArgs<ShopOrder>,
  ): Promise<GetAllGenericResponse<ShopOrder>> {
    try {
      let queryOptions: FindManyOptions<ShopOrder> = {};
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
