import { Injectable } from '@nestjs/common';
import { CreateAddressInput, UpdateAddressInput } from 'src/core/dtos';
import { IAddress } from 'src/core/entities';

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
    return newAddress;
  }

  updateAddress(updateAddressInput: UpdateAddressInput) {
    const newAddress = new IAddress();
    newAddress.unitNumber = updateAddressInput.unitNumber;
    newAddress.streetNumber = updateAddressInput.streetNumber;
    newAddress.addressLine1 = updateAddressInput.addressLine1;
    newAddress.addressLine2 = updateAddressInput.addressLine2;
    newAddress.city = updateAddressInput.city;
    newAddress.region = updateAddressInput.region;
    newAddress.postalCode = updateAddressInput.postalCode;
    newAddress.reference = updateAddressInput.reference;
    return newAddress;
  }
}
