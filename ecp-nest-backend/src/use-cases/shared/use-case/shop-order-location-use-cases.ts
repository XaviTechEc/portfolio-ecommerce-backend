import { Injectable } from '@nestjs/common';
import { IShopOrderLocationRepository } from 'src/core/abstracts/repositories';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { IShopOrderLocation } from 'src/core/entities';
import { ShopOrderLocationFactoryService } from '../factory';
import {
  IGenericArgs,
  CreateShopOrderLocationInput,
  UpdateShopOrderLocationInput,
} from 'src/core/dtos';

@Injectable()
export class ShopOrderLocationUseCases
  implements IShopOrderLocationRepository<IShopOrderLocation>
{
  constructor(
    private dataService: IDataSourcesService,
    private shopOrderLocationFactoryService: ShopOrderLocationFactoryService,
  ) {}
  getAllShopOrderLocation(
    args?: IGenericArgs<IShopOrderLocation>,
  ): Promise<IShopOrderLocation[]> {
    return this.dataService.shopOrderLocations.getAllShopOrderLocation(args);
  }
  getOneShopOrderLocationById(id: string): Promise<IShopOrderLocation> {
    return this.dataService.shopOrderLocations.getOneShopOrderLocationById(id);
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
  updateOneShopOrderLocationById(
    id: string,
    updateShopOrderLocationInput: UpdateShopOrderLocationInput,
  ): Promise<IShopOrderLocation> {
    const shopOrderLocation =
      this.shopOrderLocationFactoryService.updateShopOrderLocation(
        updateShopOrderLocationInput,
      );
    return this.dataService.shopOrderLocations.updateOneShopOrderLocationById(
      id,
      shopOrderLocation,
    );
  }
  deleteOneShopOrderLocationById(id: string): Promise<IShopOrderLocation> {
    return this.dataService.shopOrderLocations.deleteOneShopOrderLocationById(
      id,
    );
  }
}
