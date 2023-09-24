import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthUseCases } from 'src/auth/application/use-cases/auth-use-cases';
import { IJwtPayload } from 'src/common/domain/interfaces/jwt/jwt-payload.interface';
import { ExceptionsService } from 'src/common/infrastructure/exceptions/exceptions.service';
import { EnvironmentConfigService } from 'src/configuration/env/env-config.service';
import { IUser } from 'src/users/domain/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authUseCases: AuthUseCases,
    private environmentConfigService: EnvironmentConfigService,
    private exceptionsService: ExceptionsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: environmentConfigService.getJwtSecret(),
    });
  }

  async validate(payload: IJwtPayload): Promise<IUser> {
    const { uid } = payload;
    const user = await this.authUseCases.validateUserForJwtStrategy(uid);
    if (!user || !user.active) {
      return this.exceptionsService.unauthorized({
        message: 'Invalid token | User does not exists | User is not active',
      });
    }
    return user;
  }
}
