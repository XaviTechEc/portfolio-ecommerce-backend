import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthUseCases } from 'src/auth/application/use-cases/auth-use-cases';
import { SignInUserDto } from 'src/auth/domain/dtos/rest/sign-in-user.dto';
import { CurrentUser } from 'src/auth/infrastructure/decorators/current-user.decorator';
import { GoogleOAuthGuard } from 'src/auth/infrastructure/guards/google-auth.guard';
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

  @Get('/google')
  @UseGuards(GoogleOAuthGuard)
  googleLogin() {}

  @Get('/google/callback')
  @UseGuards(GoogleOAuthGuard)
  googleLoginCallback(@CurrentUser() user) {
    return this.authUseCases.googleLoginCallback(user);
  }
}
