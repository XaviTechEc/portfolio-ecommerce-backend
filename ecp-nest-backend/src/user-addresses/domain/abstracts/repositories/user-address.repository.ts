import {
  IGenericArgs,
  PaginationArgs,
} from 'src/common/domain/dtos/graphql/args';
import {
  CreateUserAddressInput,
  UpdateUserAddressInput,
} from '../../dtos/graphql/inputs/user-address.input';

export abstract class IUserAddressRepository<T> {
  abstract getAllUserAddress(args?: IGenericArgs<T>): Promise<T[]>;
  abstract getUserAddressById(id: string): Promise<T>;
  abstract createUserAddress(
    createUserAddressInput: CreateUserAddressInput,
  ): Promise<T>;
  abstract updateUserAddress(
    id: string,
    updateUserAddressInput: UpdateUserAddressInput,
  ): Promise<T>;
  abstract removeUserAddress(id: string): Promise<T>;

  abstract getUserAddressesBy(
    term: string,
    fields: (keyof T)[],
    paginationArgs: PaginationArgs,
  ): Promise<T[]>;
}
