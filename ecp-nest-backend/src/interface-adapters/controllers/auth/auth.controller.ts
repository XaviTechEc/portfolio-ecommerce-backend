import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto, SignInUserDto } from 'src/core/dtos';
import { AuthUseCases } from 'src/use-cases';

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
