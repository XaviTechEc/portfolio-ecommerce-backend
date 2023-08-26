import { Injectable } from '@nestjs/common';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { UserFactoryService } from './user-factory.service';
import { IUser } from 'src/core/entities';
import { IUsersRepository } from 'src/core/abstracts/repositories/users/users.repository';
import { CreateUserDto, UpdateUserDto } from 'src/core/dtos';

@Injectable()
export class UserUseCases implements IUsersRepository {
  constructor(
    private dataServices: IDataSourcesService,
    private userFactoryService: UserFactoryService,
  ) {}

  getUserBy(fields: Partial<IUser>): Promise<IUser> {
    return this.dataServices.users.getOneBy(fields);
  }

  getAllUsers(): Promise<IUser[]> {
    return this.dataServices.users.getAll();
  }

  getUserById(id: string): Promise<IUser> {
    return this.dataServices.users.getOneById(id);
  }

  createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const user = this.userFactoryService.createUser(createUserDto);
    return this.dataServices.users.create(user);
  }

  updateUser(id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    const user = this.userFactoryService.updateUser(updateUserDto);
    return this.dataServices.users.updateOneById(id, user);
  }

  removeUser(id: string): Promise<IUser> {
    return this.dataServices.users.deleteOneById(id);
  }
}
