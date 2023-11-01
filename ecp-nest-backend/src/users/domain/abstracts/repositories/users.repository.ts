import { IGenericArgs } from 'src/common/domain/dtos/graphql/args';
import { GetAllGenericResponse } from 'src/common/domain/interfaces/responses/get-all-generic-response.interface';

export abstract class IUsersRepository<T> {
  abstract getAllUsers(
    args?: IGenericArgs<T>,
  ): Promise<GetAllGenericResponse<T>>;
  abstract getUserById(id: string): Promise<T>;
  abstract createUser(data: T): Promise<T>;
  abstract updateUser(id: string, data: T): Promise<T>;
  abstract removeUser(id: string): Promise<T>;
  abstract getShortUserById(id: string): Promise<T>;
}
