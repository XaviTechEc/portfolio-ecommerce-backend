import { Injectable } from '@nestjs/common';
import { CreateUserAddressInput, UpdateUserAddressInput } from 'src/core/dtos';
import { IUserAddress } from 'src/core/entities';

@Injectable()
export class UserAddressFactoryService {
  createUserAddress(createUserAddressInput: CreateUserAddressInput) {
    const newUserAddress = new IUserAddress();
    newUserAddress.isDefault = createUserAddressInput.isDefault;
    newUserAddress.user = createUserAddressInput.user;
    newUserAddress.address = createUserAddressInput.address;
    return newUserAddress;
  }
  updateUserAddress(updateUserAddressInput: UpdateUserAddressInput) {
    const newUserAddress = new IUserAddress();
    newUserAddress.isDefault = updateUserAddressInput.isDefault;
    newUserAddress.user = updateUserAddressInput.user;
    newUserAddress.address = updateUserAddressInput.address;
    return newUserAddress;
  }
}
