import { Injectable } from '@nestjs/common';
import {
  CreateUserAddressInput,
  UpdateUserAddressInput,
} from 'src/user-addresses/domain/dtos/graphql/inputs/user-address.input';
import { IUserAddress } from 'src/user-addresses/domain/entities/user-address.entity';

@Injectable()
export class UserAddressFactoryService {
  createUserAddress(createUserAddressInput: CreateUserAddressInput) {
    const newUserAddress = new IUserAddress();
    newUserAddress.isDefault = createUserAddressInput.isDefault;
    newUserAddress.user = createUserAddressInput.user;
    newUserAddress.address = createUserAddressInput.address;
    newUserAddress.active = createUserAddressInput.active;
    return newUserAddress;
  }
  updateUserAddress(updateUserAddressInput: UpdateUserAddressInput) {
    const newUserAddress = new IUserAddress();
    newUserAddress.id = updateUserAddressInput.id;
    newUserAddress.isDefault = updateUserAddressInput.isDefault;
    newUserAddress.user = updateUserAddressInput.user;
    newUserAddress.address = updateUserAddressInput.address;
    newUserAddress.active = updateUserAddressInput.active;
    return newUserAddress;
  }
}
