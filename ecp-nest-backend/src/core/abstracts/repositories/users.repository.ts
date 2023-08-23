import { User } from 'src/core/entities';

export abstract class IUsersRepository {
  abstract getAllUsers(): Promise<User[]>;
  abstract getUserById(id: string): Promise<User>;
  abstract createUser(createUserDto: any): Promise<User>;
  // abstract updateUser(updateUserDto: any): Promise<User>;
}
