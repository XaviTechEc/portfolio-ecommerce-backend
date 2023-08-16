import { Injectable } from '@nestjs/common';
import { User } from 'src/core/entities';

@Injectable()
export class UserFactoryService {
  createUser(createUserDto: any) {
    const newUser = new User({ ...createUserDto });
    return newUser;
  }

  updateUser(updateUserDto: any) {
    const newUser = new User({ ...updateUserDto });
    return newUser;
  }
}
