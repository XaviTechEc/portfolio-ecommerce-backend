import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthUseCases } from 'src/auth/application/use-cases/auth-use-cases';
import { IExceptionsService } from '../../../../common/domain/abstracts/services/exceptions/exceptions.abstract.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    private _authUseCases: AuthUseCases,
    private _exceptionsService: IExceptionsService,
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this._authUseCases.validateUserLocal(email, password);
    if (!user) {
      return this._exceptionsService.unauthorized({
        message: 'Invalid credentials',
      });
    }
    return user;
  }
}
