import { IGenericArgs } from 'src/core/abstracts/generic-args.repository';
import { IUsersRepository } from 'src/core/abstracts/repositories';
import { CreateUserDto, UpdateUserDto } from 'src/core/dtos';
import { Repository } from 'typeorm';

export class UsersRepository<T> implements IUsersRepository<T> {
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }
  getAllUsers(args?: IGenericArgs<T>): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  getUserById(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
  createUser(createUserDto: CreateUserDto): Promise<T> {
    throw new Error('Method not implemented.');
  }
  updateUser(id: string, updateUserDto: UpdateUserDto): Promise<T> {
    throw new Error('Method not implemented.');
  }
  removeUser(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
}
