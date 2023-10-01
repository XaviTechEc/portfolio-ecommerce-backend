import { Injectable } from '@nestjs/common';
import {
  CreateUserDto,
  UpdateUserDto,
} from 'src/users/domain/dtos/rest/user.dto';
import { IUser } from 'src/users/domain/entities/user.entity';

@Injectable()
export class UserFactoryService {
  createUser(createUserDto: CreateUserDto) {
    const newUser = new IUser();
    newUser.username = createUserDto.username;
    newUser.email = createUserDto.email;
    newUser.password = createUserDto.password;
    newUser.fullName = createUserDto.fullName;
    return newUser;
  }

  updateUser(updateUserDto: UpdateUserDto) {
    const newUser = new IUser();
    newUser.username = updateUserDto.username;
    newUser.email = updateUserDto.email;
    newUser.password = updateUserDto.password;
    newUser.fullName = updateUserDto.fullName;
    newUser.phoneNumber = updateUserDto.phoneNumber;
    newUser.userType = updateUserDto.userType;
    newUser.roles = updateUserDto.roles;
    newUser.gender = updateUserDto.gender;
    newUser.avatarImg = updateUserDto.avatarImg;
    newUser.active = updateUserDto.active;
    newUser.lastConnection = updateUserDto.lastConnection;
    return newUser;
  }
}
