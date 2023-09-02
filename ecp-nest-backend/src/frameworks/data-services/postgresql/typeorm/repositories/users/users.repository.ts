import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';
import { IUsersRepository } from 'src/core/abstracts/repositories';
import { CreateUserDto, UpdateUserDto } from 'src/core/dtos';
import { Repository } from 'typeorm';
import { User } from '../../entities/outputs/entities';

export class UsersRepository implements IUsersRepository<User> {
  private _repository: Repository<User>;

  constructor(repository: Repository<User>) {
    this._repository = repository;
  }
  getAllUsers(args?: IGenericArgs<User>): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  getUserById(id: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  createUser(data: User): Promise<User> {
    throw new Error('Method not implemented.');
  }
  updateUser(id: string, data: User): Promise<User> {
    throw new Error('Method not implemented.');
  }
  removeUser(id: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
}
