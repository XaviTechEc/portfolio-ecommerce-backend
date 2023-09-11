import { Injectable } from '@nestjs/common';
import { IDataSourcesService } from 'src/common/domain/abstracts/services';
import {
  PaginationArgs,
  IGenericArgs,
} from 'src/common/domain/dtos/graphql/args';
import { IShopOrderLocationRepository } from 'src/shop-order-locations/domain/abstracts/repositories/shop-order-location.repository';
import {
  CreateShopOrderLocationInput,
  UpdateShopOrderLocationInput,
} from 'src/shop-order-locations/domain/dtos/graphql/inputs/shop-order-location.input';
import { IShopOrderLocation } from 'src/shop-order-locations/domain/entities/shop-order-locations.entity';
import { ShopOrderLocationFactoryService } from './factory/shop-order-location-factory.service';

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
