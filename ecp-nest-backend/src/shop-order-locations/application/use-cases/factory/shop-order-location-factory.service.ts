import { Injectable } from '@nestjs/common';
import {
  CreateShopOrderLocationInput,
  UpdateShopOrderLocationInput,
} from 'src/core/dtos';
import { IShopOrderLocation } from 'src/core/entities';

@Injectable()
export class ShopOrderLocationFactoryService {
  createShopOrderLocation(
    createShopOrderLocationInput: CreateShopOrderLocationInput,
  ) {
    const newShopOrderLocation = new IShopOrderLocation();
    newShopOrderLocation.shopOrder = createShopOrderLocationInput.shopOrder;
    newShopOrderLocation.location = createShopOrderLocationInput.location;
    return newShopOrderLocation;
  }
  updateShopOrderLocation(
    updateShopOrderLocationInput: UpdateShopOrderLocationInput,
  ) {
    const newShopOrderLocation = new IShopOrderLocation();
    newShopOrderLocation.shopOrder = updateShopOrderLocationInput.shopOrder;
    newShopOrderLocation.location = updateShopOrderLocationInput.location;
    return newShopOrderLocation;
  }
}
