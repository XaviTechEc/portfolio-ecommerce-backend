import { IGenericArgs } from 'src/common/domain/dtos/graphql/args';
import { ICustomGenericResponseWithPagination } from 'src/common/domain/interfaces/responses/custom-generic-response.interface';

export abstract class IUsersRepository<T> {
  abstract getAllUsers(
    args?: IGenericArgs<T>,
  ): Promise<ICustomGenericResponseWithPagination<T>>;
  abstract getUserById(id: string): Promise<T>;
  abstract createUser(data: T): Promise<T>;
  abstract updateUser(id: string, data: T): Promise<T>;
  abstract removeUser(id: string): Promise<T>;
  abstract restoreUserById(id: string): Promise<T>;
}
