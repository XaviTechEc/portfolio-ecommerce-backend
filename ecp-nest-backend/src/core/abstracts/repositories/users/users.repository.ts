import { IUser } from 'src/core/entities';

export abstract class IUsersRepository {
  abstract getAllUsers(): Promise<IUser[]>;
  abstract getUserById(id: string): Promise<IUser>;
  abstract getUserBy(fields: Partial<IUser>): Promise<IUser>;
  abstract createUser(createUserDto: any): Promise<IUser>;
  abstract updateUser(id: string, updateUserDto: any): Promise<IUser>;
}
