import { IGenericArgs } from 'src/common/domain/dtos/graphql/args';

export abstract class IUsersRepository<T> {
  abstract getAllUsers(args?: IGenericArgs<T>): Promise<T[]>;
  abstract getUserById(id: string): Promise<T>;
  abstract createUser(data: T): Promise<T>;
  abstract updateUser(id: string, data: T): Promise<T>;
  abstract removeUser(id: string): Promise<T>;
}
