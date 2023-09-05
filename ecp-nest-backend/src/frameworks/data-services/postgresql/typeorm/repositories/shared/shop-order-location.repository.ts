import { IShopOrderLocationRepository } from 'src/core/abstracts/repositories';
import { Repository } from 'typeorm';
import { ShopOrderLocation } from '../../entities/outputs/entities';
import {
  IGenericArgs,
  CreateShopOrderLocationInput,
  UpdateShopOrderLocationInput,
} from 'src/core/dtos';
import { LoggerService } from '@nestjs/common';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';

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
