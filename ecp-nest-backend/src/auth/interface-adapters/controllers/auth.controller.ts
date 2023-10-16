import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthUseCases } from 'src/auth/application/use-cases/auth-use-cases';
import { SignInUserDto } from 'src/auth/domain/dtos/rest/sign-in-user.dto';
import { IGoogleUser } from 'src/auth/domain/interfaces/google-user.interface';
import { CurrentUser } from 'src/auth/infrastructure/decorators/current-user.decorator';
import { GoogleOAuthGuard } from 'src/auth/infrastructure/guards/google-auth.guard';
import { CreateUserDto } from 'src/users/domain/dtos/rest/user.dto';
import { EnvironmentConfigService } from '../../../configuration/env/env-config.service';
import { Auth } from 'src/auth/infrastructure/decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authUseCases: AuthUseCases,
    private readonly environmentConfigService: EnvironmentConfigService,
  ) {}

  @Post('/login')
  signIn(@Body() signInUserDto: SignInUserDto) {
    return this.authUseCases.signIn(signInUserDto);
  }

  @Post('/register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authUseCases.register(createUserDto);
  }

  @Auth()
  @Get('/check-auth-status')
  checkAuthStatus(@CurrentUser() user) {
    return this.authUseCases.checkAuthStatus(user);
  }

  @Get('/google')
  @UseGuards(GoogleOAuthGuard)
  googleLogin() {}

  @Get('/google/callback')
  @UseGuards(GoogleOAuthGuard)
  async googleLoginCallback(@Res() res, @CurrentUser() user: IGoogleUser) {
    const failureRedirectUrl = `${this.environmentConfigService.getFrontendWebAdminURL()}/auth/google-signin-failure`;
    const { token } = await this.authUseCases.googleLoginCallback(user);
    const redirectUrl = token
      ? `${this.environmentConfigService.getFrontendWebAdminURL()}/auth/google-signin-success?token=${token}`
      : failureRedirectUrl;
    return res.redirect(redirectUrl);
  }
}
