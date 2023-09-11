import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/core/dtos';

import { IUser } from 'src/core/entities';

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
    newUser.role = updateUserDto.role;
    newUser.gender = updateUserDto.gender;
    newUser.avatarImg = updateUserDto.avatarImg;
    newUser.active = updateUserDto.active;
    return newUser;
  }
}
