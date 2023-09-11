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
    return newShippingMethod;
  }
  updateShippingMethod(updateShippingMethodInput: UpdateShippingMethodInput) {
    const newShippingMethod = new IShippingMethod();
    newShippingMethod.name = updateShippingMethodInput.name;
    newShippingMethod.price = updateShippingMethodInput.price;
    return newShippingMethod;
  }
}
