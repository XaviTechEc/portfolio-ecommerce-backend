import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthUseCases } from 'src/auth/application/use-cases/auth-use-cases';
import { IJwtPayload } from 'src/common/domain/interfaces/jwt/jwt-payload.interface';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { EnvironmentConfigService } from 'src/configuration/env/env-config.service';
import { IUser } from 'src/users/domain/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authUseCases: AuthUseCases,
    private environmentConfigService: EnvironmentConfigService,
    private exceptionsService: IExceptionsService,
  ) {
    super({
      secretOrKey: environmentConfigService.getJwtSecret(),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }

  async validate(payload: IJwtPayload) {
    const { uid } = payload;
    const { password, ...user } =
      await this.authUseCases.validateUserForJwtStrategy(uid);
    const roles = user.roles.map((role) => role.value);
    const jwtData = { ...user, roles };

    if (!user) {
      return this.exceptionsService.unauthorized({
        message: 'Invalid token',
      });
    }

    if (!user.active) {
      return this.exceptionsService.unauthorized({
        message: ' User does not exists | User is not active',
      });
    }

    return jwtData;
  }
}
