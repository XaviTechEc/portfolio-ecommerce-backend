import { Injectable } from '@nestjs/common';
import { IGenericArgs } from 'src/common/domain/dtos/graphql/args';
import { IUsersRepository } from 'src/users/domain/abstracts/repositories/users.repository';
import { IUsersDataSourceService } from 'src/users/domain/abstracts/services/users-datasource.abstract.service';
import {
  CreateUserDto,
  UpdateUserDto,
} from 'src/users/domain/dtos/rest/user.dto';
import { IUser } from 'src/users/domain/entities/user.entity';
import { UserFactoryService } from './factory/user-factory.service';

@Injectable()
export class UserUseCases implements IUsersRepository<IUser> {
  constructor(
    private dataServices: IUsersDataSourceService,
    private userFactoryService: UserFactoryService,
  ) {}
  getAllUsers(args?: IGenericArgs<IUser>): Promise<IUser[]> {
    return this.dataServices.users.getAllUsers(args);
  }
  getUserById(id: string): Promise<IUser> {
    return this.dataServices.users.getUserById(id);
  }
  createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const user = this.userFactoryService.createUser(createUserDto);
    return this.dataServices.users.createUser(user);
  }
  updateUser(id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    const user = this.userFactoryService.updateUser(updateUserDto);
    return this.dataServices.users.updateUser(id, user);
  }
  removeUser(id: string): Promise<IUser> {
    return this.dataServices.users.removeUser(id);
  }
}
