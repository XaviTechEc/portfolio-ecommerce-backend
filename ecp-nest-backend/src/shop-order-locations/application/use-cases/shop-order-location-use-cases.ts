import { Injectable } from '@nestjs/common';
import {
  GetManyProps,
  GetOneByIdProps,
  CreateProps,
  UpdateOneByIdProps,
  DeleteOneByIdProps,
} from 'src/common/domain/abstracts/generic-data-methods.repository';
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
    private dataServices: IShopOrderLocationsDataSourceService,
    private shopOrderLocationFactoryService: ShopOrderLocationFactoryService,
  ) {}

  getMany(props: GetManyProps<IShopOrderLocation>) {
    return this.dataServices.shopOrderLocations.getMany({ ...props });
  }

  getOneById(props: GetOneByIdProps) {
    return this.dataServices.shopOrderLocations.getOneById({ ...props });
  }

  create(props: CreateProps<CreateShopOrderLocationInput>) {
    const newShopOrderLocation =
      this.shopOrderLocationFactoryService.createShopOrderLocation(props.data);
    return this.dataServices.shopOrderLocations.create({
      ...props,
      data: newShopOrderLocation,
    });
  }

  updateOneById(props: UpdateOneByIdProps<UpdateShopOrderLocationInput>) {
    const newShopOrderLocation =
      this.shopOrderLocationFactoryService.updateShopOrderLocation(props.data);
    return this.dataServices.shopOrderLocations.updateOneById({
      ...props,
      data: newShopOrderLocation,
    });
  }

  deleteOneById(props: DeleteOneByIdProps) {
    return this.dataServices.shopOrderLocations.deleteOneById({ ...props });
  }
}
