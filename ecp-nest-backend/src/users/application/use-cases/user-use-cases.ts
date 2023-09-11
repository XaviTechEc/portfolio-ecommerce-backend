import { Injectable } from '@nestjs/common';
import { IDataSourcesService } from 'src/core/abstracts/services/data-services/data-sources.service';
import { UserFactoryService } from './user-factory.service';
import { IUser } from 'src/core/entities';
import { IUsersRepository } from 'src/core/abstracts/repositories/users/users.repository';
import { CreateUserDto, UpdateUserDto } from 'src/core/dtos';
import { IGenericArgs } from 'src/core/dtos/graphql/args/generic-args.repository';

@Injectable()
export class UserUseCases implements IUsersRepository<IUser> {
  constructor(
    private dataServices: IDataSourcesService,
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
