import { CreateUserDto, UpdateUserDto } from 'src/core/dtos';
import { IUser } from 'src/core/entities';

export abstract class IUsersRepository {
  abstract getAllUsers(options: any): Promise<IUser[]>;
  abstract getUserById(id: string): Promise<IUser>;
  abstract getUserBy(fields: Partial<IUser>): Promise<IUser>;
  abstract createUser(createUserDto: CreateUserDto): Promise<IUser>;
  abstract updateUser(id: string, updateUserDto: UpdateUserDto): Promise<IUser>;
  abstract removeUser(id: string): Promise<IUser>;
}
