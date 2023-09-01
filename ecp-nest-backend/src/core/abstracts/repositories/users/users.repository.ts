import { CreateUserDto, UpdateUserDto } from 'src/core/dtos';
import { IGenericArgs } from '../../../dtos/graphql/args/generic-args.repository';

export abstract class IUsersRepository<T> {
  abstract getAllUsers(args?: IGenericArgs<T>): Promise<T[]>;
  abstract getUserById(id: string): Promise<T>;
  abstract createUser(createUserDto: CreateUserDto): Promise<T>;
  abstract updateUser(id: string, updateUserDto: UpdateUserDto): Promise<T>;
  abstract removeUser(id: string): Promise<T>;
}
