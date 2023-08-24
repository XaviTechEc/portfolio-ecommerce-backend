import { Injectable } from '@nestjs/common';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { UserFactoryService } from './user-factory.service';
import { User } from 'src/core/entities';
import { IUsersRepository } from 'src/core/abstracts/repositories/users.repository';

@Injectable()
export class UserUseCases implements IUsersRepository {
  constructor(
    private dataServices: IDataSourcesService,
    private userFactoryService: UserFactoryService,
  ) {}

  getAllUsers(): Promise<User[]> {
    return this.dataServices.users.getAll();
  }

  getUserById(id: string): Promise<User> {
    return this.dataServices.users.getOneById(id);
  }

  createUser(createUserDto: any): Promise<User> {
    const user = this.userFactoryService.createUser(createUserDto);
    return this.dataServices.users.create(user);
  }

  updateUser(id: string, updateUserDto: any): Promise<User> {
    const user = this.userFactoryService.updateUser(updateUserDto);
    return this.dataServices.users.updateOneById(id, user);
  }
}
