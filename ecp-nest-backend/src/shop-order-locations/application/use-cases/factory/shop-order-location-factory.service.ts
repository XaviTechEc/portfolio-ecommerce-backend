import { Injectable } from '@nestjs/common';
import {
  CreateShopOrderLocationInput,
  UpdateShopOrderLocationInput,
} from 'src/shop-order-locations/domain/dtos/graphql/inputs/shop-order-location.input';
import { IShopOrderLocation } from 'src/shop-order-locations/domain/entities/shop-order-locations.entity';

@Injectable()
export class ShopOrderLocationFactoryService {
  createShopOrderLocation(
    createShopOrderLocationInput: CreateShopOrderLocationInput,
  ) {
    const newShopOrderLocation = new IShopOrderLocation();
    newShopOrderLocation.shopOrder = createShopOrderLocationInput.shopOrder;
    newShopOrderLocation.location = createShopOrderLocationInput.location;
    newShopOrderLocation.active = createShopOrderLocationInput.active;
    return newShopOrderLocation;
  }
  updateShopOrderLocation(
    updateShopOrderLocationInput: UpdateShopOrderLocationInput,
  ) {
    const newShopOrderLocation = new IShopOrderLocation();
    newShopOrderLocation.id = updateShopOrderLocationInput.id;
    newShopOrderLocation.shopOrder = updateShopOrderLocationInput.shopOrder;
    newShopOrderLocation.location = updateShopOrderLocationInput.location;
    newShopOrderLocation.active = updateShopOrderLocationInput.active;
    return newShopOrderLocation;
  }
}
