import { Injectable } from '@nestjs/common';
import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { UserFactoryService } from './user-factory.service';
import { User } from 'src/core/entities';

@Injectable()
export class UserUseCases {
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
}
