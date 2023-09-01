export abstract class IUsersRepository<T> {
  abstract getAllUsers(): Promise<T[]>;
  abstract getUserById(id: string): Promise<T>;
  abstract createUser(data: T): Promise<T>;
  abstract updateUser(id: string, data: T): Promise<T>;
  abstract removeUser(id: string): Promise<T>;
}
