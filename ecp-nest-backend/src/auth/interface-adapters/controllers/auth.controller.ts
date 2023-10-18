import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { AuthUseCases } from 'src/auth/application/use-cases/auth-use-cases';
import { IGoogleUser } from 'src/auth/domain/interfaces/google-user.interface';
import { CurrentUser } from 'src/auth/infrastructure/decorators/current-user.decorator';
import { Public } from 'src/auth/infrastructure/decorators/public.decorator';
import { GoogleOAuthGuard } from 'src/auth/infrastructure/guards/google-auth.guard';
import { LocalAuthGuard } from 'src/auth/infrastructure/guards/local-auth.guard';
import { ValidTokenPipe } from 'src/auth/infrastructure/pipe/valid-token.pipe';
import { CreateUserDto } from 'src/users/domain/dtos/rest/user.dto';
import { IJwtService } from '../../../common/domain/abstracts/services/jwt/jwt.abstract.service';
import { EnvironmentConfigService } from '../../../configuration/env/env-config.service';

@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authUseCases: AuthUseCases,
    private readonly environmentConfigService: EnvironmentConfigService,
    private jwtService: IJwtService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  signIn(@CurrentUser() user) {
    return this.authUseCases.signIn(user);
  }

  @Post('/register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authUseCases.register(createUserDto);
  }

  @Get('/check-auth-status')
  checkAuthStatus(@Headers('x-token') token: string) {
    return this.authUseCases.checkAuthStatus(token);
  }

  @Get('/renew/:token')
  renewToken(@Param('token', ValidTokenPipe) token: string) {
    return this.authUseCases.renewToken(token);
  }

  @UseGuards(GoogleOAuthGuard)
  @Get('/google')
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
