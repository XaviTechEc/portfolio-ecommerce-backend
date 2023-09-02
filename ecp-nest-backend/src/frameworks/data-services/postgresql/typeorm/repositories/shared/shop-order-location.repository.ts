import { IShopOrderLocationRepository } from 'src/core/abstracts/repositories';
import { Repository } from 'typeorm';
import { ShopOrderLocation } from '../../entities/outputs/entities';
import {
  IGenericArgs,
  CreateShopOrderLocationInput,
  UpdateShopOrderLocationInput,
} from 'src/core/dtos';

export class ShopOrderLocationsRepository
  implements IShopOrderLocationRepository<ShopOrderLocation>
{
  private _repository: Repository<ShopOrderLocation>;

  constructor(repository: Repository<ShopOrderLocation>) {
    this._repository = repository;
  }
  getAllShopOrderLocation(
    args?: IGenericArgs<ShopOrderLocation>,
  ): Promise<ShopOrderLocation[]> {
    throw new Error('Method not implemented.');
  }
  getShopOrderLocationById(id: string): Promise<ShopOrderLocation> {
    throw new Error('Method not implemented.');
  }
  createShopOrderLocation(
    createShopOrderLocationInput: CreateShopOrderLocationInput,
  ): Promise<ShopOrderLocation> {
    throw new Error('Method not implemented.');
  }
  updateShopOrderLocation(
    id: string,
    updateShopOrderLocationInput: UpdateShopOrderLocationInput,
  ): Promise<ShopOrderLocation> {
    throw new Error('Method not implemented.');
  }
  removeShopOrderLocation(id: string): Promise<ShopOrderLocation> {
    throw new Error('Method not implemented.');
  }
}
