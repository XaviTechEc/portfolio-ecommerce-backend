import { Injectable } from '@nestjs/common';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { UserFactoryService } from './user-factory.service';
import { IUser } from 'src/core/entities';
import { IUsersRepository } from 'src/core/abstracts/repositories/users/users.repository';
import { CreateUserDto, UpdateUserDto } from 'src/core/dtos';
import { IGenericArgs } from 'src/core/abstracts/generic-args.repository';

@Injectable()
export class UserUseCases implements IUsersRepository<IUser> {
  constructor(
    private dataServices: IDataSourcesService,
    private userFactoryService: UserFactoryService,
  ) {}
  getAllUsers(args?: IGenericArgs<IUser>): Promise<IUser[]> {
    throw new Error('Method not implemented.');
  }
  getUserById(id: string): Promise<IUser> {
    throw new Error('Method not implemented.');
  }
  createUser(createUserDto: CreateUserDto): Promise<IUser> {
    throw new Error('Method not implemented.');
  }
  updateUser(id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    throw new Error('Method not implemented.');
  }
  removeUser(id: string): Promise<IUser> {
    throw new Error('Method not implemented.');
  }
}
