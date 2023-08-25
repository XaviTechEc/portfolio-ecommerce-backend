import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/core/dtos';

import { IUser } from 'src/core/entities';

@Injectable()
export class UserFactoryService {
  createUser(createUserDto: CreateUserDto) {
    return new IUser({ ...createUserDto });
  }

  updateUser(updateUserDto: UpdateUserDto) {
    return new IUser({ ...updateUserDto });
  }
}
