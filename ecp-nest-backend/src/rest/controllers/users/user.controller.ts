import { Controller, Get } from '@nestjs/common';
import { UserUseCases } from 'src/use-cases/users/user-use-cases';

@Controller('user')
export class UserController {
  constructor(private userUseCases: UserUseCases) {}

  @Get()
  async getAllUsers() {
    return this.userUseCases.getAllUsers();
  }
}
