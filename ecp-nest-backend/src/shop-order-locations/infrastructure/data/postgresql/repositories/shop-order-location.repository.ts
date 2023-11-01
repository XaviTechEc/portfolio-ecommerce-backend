import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import {
  PaginationArgs,
  IGenericArgs,
} from 'src/common/domain/dtos/graphql/args';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { IShopOrderLocationRepository } from 'src/shop-order-locations/domain/abstracts/repositories/shop-order-location.repository';
import {
  CreateShopOrderLocationInput,
  UpdateShopOrderLocationInput,
} from 'src/shop-order-locations/domain/dtos/graphql/inputs/shop-order-location.input';
import {
  Repository,
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
} from 'typeorm';
import { ShopOrderLocation } from '../entities/ShopOrderLocation.entity';
import { GetAllGenericResponse } from 'src/common/domain/interfaces/responses/get-all-generic-response.interface';
import { getPageCount } from 'src/common/infrastructure/helpers/get-page-count.helper';

const CONTEXT = 'ShopOrderLocationsRepository';

export class ShopOrderLocationsRepository
  implements IShopOrderLocationRepository<ShopOrderLocation>
{
  private _repository: Repository<ShopOrderLocation>;
  private _loggerService: ILoggerService;
  private _exceptionsService: IExceptionsService;

  constructor(
    repository: Repository<ShopOrderLocation>,
    loggerService: ILoggerService,
    exceptionsService: IExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }
  async getShopOrderLocationsBy(
    term: string,
    fields: (keyof ShopOrderLocation)[],
    paginationArgs: PaginationArgs,
  ): Promise<GetAllGenericResponse<ShopOrderLocation>> {
    try {
      let queryOptions: FindManyOptions<ShopOrderLocation> = {};
      let relations: FindOptionsRelations<ShopOrderLocation> = {};
      let where: FindOptionsWhere<ShopOrderLocation> = {};
      let pageSize;

      if (paginationArgs) {
        const { limit = 10, offset = 0 } = paginationArgs;
        pageSize = limit;
        queryOptions = { take: limit, skip: offset };
      }

      for (const field of fields) {
        if (field === 'shopOrder') {
          relations = { ...relations, shopOrder: true };
          where = {
            ...where,
            shopOrder: [{ id: term }],
          };
        }

        if (field === 'location') {
          relations = { ...relations, location: true };
          where = {
            ...where,
            location: [{ id: term }],
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

  async getAllShopOrderLocation(
    args?: IGenericArgs<ShopOrderLocation>,
  ): Promise<GetAllGenericResponse<ShopOrderLocation>> {
    try {
      let qb = this._repository.createQueryBuilder('shopOrderLocation');
      let pageSize;

      if (args) {
        const { paginationArgs } = args;
        if (paginationArgs) {
          const { limit = 10, offset = 0 } = paginationArgs;
          pageSize = limit;
          qb = qb.take(limit).skip(offset);
        }
      }

      const [items, total] = await qb.getManyAndCount();
      return { items, total, pageCount: getPageCount(total, pageSize) };
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async getShopOrderLocationById(id: string): Promise<ShopOrderLocation> {
    try {
      const shopOrderLocationFound = await this._repository.findOneBy({ id });
      if (!shopOrderLocationFound) {
        return this._exceptionsService.notFound({
          message: `The shopOrderLocation with id ${id} could not be found`,
        });
      }
      return shopOrderLocationFound;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async createShopOrderLocation(
    createShopOrderLocationInput: CreateShopOrderLocationInput,
  ): Promise<ShopOrderLocation> {
    try {
      const newShopOrderLocation = this._repository.create({
        ...createShopOrderLocationInput,
      });
      return this._repository.save(newShopOrderLocation);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async updateShopOrderLocation(
    id: string,
    updateShopOrderLocationInput: UpdateShopOrderLocationInput,
  ): Promise<ShopOrderLocation> {
    try {
      await this.getShopOrderLocationById(id);
      const newShopOrderLocation = await this._repository.preload({
        ...updateShopOrderLocationInput,
      });
      return this._repository.save(newShopOrderLocation);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async removeShopOrderLocation(id: string): Promise<ShopOrderLocation> {
    try {
      const shopOrderLocation = await this.getShopOrderLocationById(id);
      return this._repository.remove(shopOrderLocation);
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }
}
