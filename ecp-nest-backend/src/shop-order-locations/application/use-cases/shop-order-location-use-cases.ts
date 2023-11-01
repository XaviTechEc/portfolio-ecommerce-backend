import { Injectable } from '@nestjs/common';
import {
  IGenericArgs,
  PaginationArgs,
} from 'src/common/domain/dtos/graphql/args';
import { IShopOrderLocationsDataSourceService } from 'src/shop-order-locations/domain/abstracts/services/shop-order-locations-datasource.abstract.service';
import {
  CreateShopOrderLocationInput,
  UpdateShopOrderLocationInput,
} from 'src/shop-order-locations/domain/dtos/graphql/inputs/shop-order-location.input';
import { IShopOrderLocation } from 'src/shop-order-locations/domain/entities/shop-order-locations.entity';
import { ShopOrderLocationFactoryService } from './factory/shop-order-location-factory.service';

@Injectable()
export class ShopOrderLocationUseCases {
  constructor(
    private dataService: IShopOrderLocationsDataSourceService,
    private shopOrderLocationFactoryService: ShopOrderLocationFactoryService,
  ) {}
  getShopOrderLocationsBy(
    term: string,
    fields: (keyof IShopOrderLocation)[],
    paginationArgs: PaginationArgs,
  ) {
    return this.dataService.shopOrderLocations.getShopOrderLocationsBy(
      term,
      fields,
      paginationArgs,
    );
  }
  getAllShopOrderLocation(args?: IGenericArgs<IShopOrderLocation>) {
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
