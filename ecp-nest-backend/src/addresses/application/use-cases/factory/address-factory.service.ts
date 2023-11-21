import { Injectable } from '@nestjs/common';
import {
  CreateAddressInput,
  UpdateAddressInput,
} from 'src/addresses/domain/dtos/graphql/inputs/address.input';
import { IAddress } from 'src/addresses/domain/entities/address.entity';

@Injectable()
export class AddressFactoryService {
  createAddress(createAddressInput: CreateAddressInput) {
    const newAddress = new IAddress();
    newAddress.unitNumber = createAddressInput.unitNumber;
    newAddress.streetNumber = createAddressInput.streetNumber;
    newAddress.addressLine1 = createAddressInput.addressLine1;
    newAddress.addressLine2 = createAddressInput.addressLine2;
    newAddress.city = createAddressInput.city;
    newAddress.region = createAddressInput.region;
    newAddress.postalCode = createAddressInput.postalCode;
    newAddress.reference = createAddressInput.reference;
    newAddress.country = createAddressInput.country;
    newAddress.location = createAddressInput.location;
    newAddress.active = createAddressInput.active;
    return newAddress;
  }

  updateAddress(updateAddressInput: UpdateAddressInput) {
    const newAddress = new IAddress();
    newAddress.id = updateAddressInput.id;
    newAddress.unitNumber = updateAddressInput.unitNumber;
    newAddress.streetNumber = updateAddressInput.streetNumber;
    newAddress.addressLine1 = updateAddressInput.addressLine1;
    newAddress.addressLine2 = updateAddressInput.addressLine2;
    newAddress.city = updateAddressInput.city;
    newAddress.region = updateAddressInput.region;
    newAddress.postalCode = updateAddressInput.postalCode;
    newAddress.reference = updateAddressInput.reference;
    newAddress.country = updateAddressInput.country;
    newAddress.location = updateAddressInput.location;
    return newAddress;
  }
}
