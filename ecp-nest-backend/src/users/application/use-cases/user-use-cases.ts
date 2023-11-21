import { Injectable } from '@nestjs/common';
import { IGenericArgs } from 'src/common/domain/dtos/graphql/args';
import { IUsersDataSourceService } from 'src/users/domain/abstracts/services/users-datasource.abstract.service';
import {
  CreateUserDto,
  UpdateUserDto,
} from 'src/users/domain/dtos/rest/user.dto';
import { IUser } from 'src/users/domain/entities/user.entity';
import { UserFactoryService } from './factory/user-factory.service';

@Injectable()
export class UserUseCases {
  constructor(
    private dataServices: IUsersDataSourceService,
    private userFactoryService: UserFactoryService,
  ) {}
  getAllUsers(args?: IGenericArgs<IUser>) {
    return this.dataServices.users.getAllUsers({ ...args });
  }
  getUserById(id: string) {
    return this.dataServices.users.getUserById(id);
  }
  createUser(createUserDto: CreateUserDto) {
    const user = this.userFactoryService.createUser(createUserDto);
    return this.dataServices.users.createUser(user);
  }
  updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = this.userFactoryService.updateUser(updateUserDto);
    return this.dataServices.users.updateUser(id, user);
  }
  removeUser(id: string) {
    return this.dataServices.users.removeUser(id);
  }

  restoreUser(id: string) {
    return this.dataServices.users.restoreUserById(id);
  }
}
