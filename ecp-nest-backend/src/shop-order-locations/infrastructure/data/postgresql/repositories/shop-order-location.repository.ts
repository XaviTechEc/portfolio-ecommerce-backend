import { IShopOrderLocationRepository } from 'src/core/abstracts/repositories';
import {
  CreateShopOrderLocationInput,
  IGenericArgs,
  PaginationArgs,
  UpdateShopOrderLocationInput,
} from 'src/core/dtos';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';
import { LoggerService } from 'src/infrastructure/logger/logger.service';
import {
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { ShopOrderLocation } from '../../entities/outputs/entities';

export class ShopOrderLocationsRepository
  implements IShopOrderLocationRepository<ShopOrderLocation>
{
  private _repository: Repository<ShopOrderLocation>;
  private _loggerService: LoggerService;
  private _exceptionsService: ExceptionsService;

  constructor(
    repository: Repository<ShopOrderLocation>,
    loggerService: LoggerService,
    exceptionsService: ExceptionsService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }
  async getShopOrderLocationsBy(
    term: string,
    fields: (keyof ShopOrderLocation)[],
    paginationArgs: PaginationArgs,
  ): Promise<ShopOrderLocation[]> {
    let queryOptions: FindManyOptions<ShopOrderLocation> = {};
    let relations: FindOptionsRelations<ShopOrderLocation> = {};
    let where: FindOptionsWhere<ShopOrderLocation> = {};

    if (paginationArgs) {
      const { limit = 10, offset = 0 } = paginationArgs;
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

    const shopOrderLocationsBy = await this._repository.find(queryOptions);
    return shopOrderLocationsBy;
  }

  async getAllShopOrderLocation(
    args?: IGenericArgs<ShopOrderLocation>,
  ): Promise<ShopOrderLocation[]> {
    let qb = this._repository.createQueryBuilder('shopOrderLocation');

    if (args) {
      const { paginationArgs } = args;
      if (paginationArgs) {
        const { limit = 10, offset = 0 } = paginationArgs;
        qb = qb.take(limit).skip(offset);
      }
    }

    const shopOrderLocations = await qb.getMany();
    return shopOrderLocations;
  }

  async getShopOrderLocationById(id: string): Promise<ShopOrderLocation> {
    const shopOrderLocationFound = await this._repository.findOneBy({ id });
    if (!shopOrderLocationFound) {
      return this._exceptionsService.notFound({
        message: `The shopOrderLocation with id ${id} could not be found`,
      });
    }
    return this._repository.save(shopOrderLocationFound);
  }

  async createShopOrderLocation(
    createShopOrderLocationInput: CreateShopOrderLocationInput,
  ): Promise<ShopOrderLocation> {
    const newShopOrderLocation = this._repository.create({
      ...createShopOrderLocationInput,
    });
    return newShopOrderLocation;
  }

  async updateShopOrderLocation(
    id: string,
    updateShopOrderLocationInput: UpdateShopOrderLocationInput,
  ): Promise<ShopOrderLocation> {
    await this.getShopOrderLocationById(id);
    const newShopOrderLocation = await this._repository.preload({
      ...updateShopOrderLocationInput,
    });
    if (!newShopOrderLocation) {
      return this._exceptionsService.notFound({
        message: 'The ShopOrderLocation could not be preloaded',
      });
    }
    return this._repository.save(newShopOrderLocation);
  }

  async removeShopOrderLocation(id: string): Promise<ShopOrderLocation> {
    const shopOrderLocation = await this.getShopOrderLocationById(id);
    return this._repository.remove(shopOrderLocation);
  }
}