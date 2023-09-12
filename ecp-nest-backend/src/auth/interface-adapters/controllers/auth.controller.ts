import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthUseCases } from 'src/auth/application/use-cases/auth-use-cases';
import { SignInUserDto } from 'src/auth/domain/dtos/rest/sign-in-user.dto';
import { CreateUserDto } from 'src/users/domain/dtos/rest/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authUseCases: AuthUseCases) {}

  @Post('/login')
  signIn(@Body() signInUserDto: SignInUserDto) {
    return this.authUseCases.signIn(signInUserDto);
  }

  @Post('/register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authUseCases.register(createUserDto);
  }

  @Get('/check-auth-status')
  // TODO: Auth Guard
  checkAuthStatus() {}
}
