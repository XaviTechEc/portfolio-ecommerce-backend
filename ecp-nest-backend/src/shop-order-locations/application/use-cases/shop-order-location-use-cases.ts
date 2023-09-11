import { Injectable } from '@nestjs/common';
import { IShopOrderLocationRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-services/data-sources.service';
import { IShopOrderLocation } from 'src/core/entities';
import { ShopOrderLocationFactoryService } from '../factory';
import {
  IGenericArgs,
  CreateShopOrderLocationInput,
  UpdateShopOrderLocationInput,
  PaginationArgs,
} from 'src/core/dtos';

@Injectable()
export class ShopOrderLocationUseCases
  implements IShopOrderLocationRepository<IShopOrderLocation>
{
  constructor(
    private dataService: IDataSourcesService,
    private shopOrderLocationFactoryService: ShopOrderLocationFactoryService,
  ) {}
  getShopOrderLocationsBy(
    term: string,
    fields: (keyof IShopOrderLocation)[],
    paginationArgs: PaginationArgs,
  ): Promise<IShopOrderLocation[]> {
    return this.dataService.shopOrderLocations.getShopOrderLocationsBy(
      term,
      fields,
      paginationArgs,
    );
  }
  getAllShopOrderLocation(
    args?: IGenericArgs<IShopOrderLocation>,
  ): Promise<IShopOrderLocation[]> {
    return this.dataService.shopOrderLocations.getAllShopOrderLocation(args);
  }
  getShopOrderLocationById(id: string): Promise<IShopOrderLocation> {
    return this.dataService.shopOrderLocations.getShopOrderLocationById(id);
  }
  createShopOrderLocation(
    createShopOrderLocationInput: CreateShopOrderLocationInput,
  ): Promise<IShopOrderLocation> {
    const shopOrderLocation =
      this.shopOrderLocationFactoryService.createShopOrderLocation(
        createShopOrderLocationInput,
      );
    return this.dataService.shopOrderLocations.createShopOrderLocation(
      shopOrderLocation,
    );
  }
  updateShopOrderLocation(
    id: string,
    updateShopOrderLocationInput: UpdateShopOrderLocationInput,
  ): Promise<IShopOrderLocation> {
    const shopOrderLocation =
      this.shopOrderLocationFactoryService.updateShopOrderLocation(
        updateShopOrderLocationInput,
      );
    return this.dataService.shopOrderLocations.updateShopOrderLocation(
      id,
      shopOrderLocation,
    );
  }
  removeShopOrderLocation(id: string): Promise<IShopOrderLocation> {
    return this.dataService.shopOrderLocations.removeShopOrderLocation(id);
  }
}
