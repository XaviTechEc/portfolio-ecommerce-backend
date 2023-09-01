import {
  CreateUserAddressInput,
  IGenericArgs,
  UpdateUserAddressInput,
} from 'src/core/dtos';

export abstract class IUserAddressRepository<T> {
  abstract getAllUserAddress(args?: IGenericArgs<T>): Promise<T[]>;
  abstract createUserAddress(
    createUserAddressInput: CreateUserAddressInput,
  ): Promise<T>;
  abstract getOneUserAddressById(id: string): Promise<T>;
  abstract updateOneUserAddressById(
    updateUserAddressInput: UpdateUserAddressInput,
  ): Promise<T>;
  abstract deleteOneUserAddressById(id: string): Promise<T>;
}
