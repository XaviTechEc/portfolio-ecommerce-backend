import { Injectable } from '@nestjs/common';
import {
  CreateShippingMethodInput,
  UpdateShippingMethodInput,
} from 'src/shipping-methods/domain/dtos/graphql/inputs/shipping-method.input';
import { IShippingMethod } from 'src/shipping-methods/domain/entities/shipping-method.entity';

@Injectable()
export class ShippingMethodFactoryService {
  createShippingMethod(createShippingMethodInput: CreateShippingMethodInput) {
    const newShippingMethod = new IShippingMethod();
    newShippingMethod.name = createShippingMethodInput.name;
    newShippingMethod.price = createShippingMethodInput.price;
    newShippingMethod.active = createShippingMethodInput.active;
    return newShippingMethod;
  }
  updateShippingMethod(updateShippingMethodInput: UpdateShippingMethodInput) {
    const newShippingMethod = new IShippingMethod();
    newShippingMethod.id = updateShippingMethodInput.id;
    newShippingMethod.name = updateShippingMethodInput.name;
    newShippingMethod.price = updateShippingMethodInput.price;
    newShippingMethod.active = updateShippingMethodInput.active;
    return newShippingMethod;
  }
}
