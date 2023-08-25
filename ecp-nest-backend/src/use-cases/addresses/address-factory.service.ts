import { Injectable } from '@nestjs/common';
import { IAddress } from 'src/core/entities';

@Injectable()
export class AddressFactoryService {
  createAddress(createAddressInput: any) {
    const newUser = new IAddress();
    return newUser;
  }

  updateAddress(updateAddressInput: any) {
    const newAddress = new IAddress();
    return newAddress;
  }
}
