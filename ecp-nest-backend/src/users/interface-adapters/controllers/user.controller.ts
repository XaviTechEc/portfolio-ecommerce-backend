import { Controller, Get } from '@nestjs/common';
import { UserUseCases } from 'src/users/application/use-cases/user-use-cases';

@Controller('users')
export class UserController {
  constructor(private userUseCases: UserUseCases) {}

  @Get()
  async getAllUsers() {
    return this.userUseCases.getAllUsers();
  }
}
