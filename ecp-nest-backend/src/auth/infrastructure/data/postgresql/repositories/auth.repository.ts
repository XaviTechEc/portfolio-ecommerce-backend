import { Injectable } from '@nestjs/common';
import { IAuthRepository } from 'src/auth/domain/abstracts/repositories/auth.repository';
import { SignInUserDto } from 'src/auth/domain/dtos/rest/sign-in-user.dto';
import { IAuthResponse } from 'src/auth/domain/interfaces/auth-response.interface';
import {
  IHashService,
  IJwtService,
} from 'src/common/domain/abstracts/services';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { IJwtPayload } from 'src/common/domain/interfaces/jwt/jwt-payload.interface';
import { CreateUserDto } from 'src/users/domain/dtos/rest/user.dto';
import { IUser } from 'src/users/domain/entities/user.entity';
import { User } from 'src/users/infrastructure/data/postgresql/entities/User.entity';
import { Repository } from 'typeorm';

const CONTEXT = 'AuthRepository';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(
    private _repository: Repository<User>,
    private _loggerService: ILoggerService,
    private _exceptionsService: IExceptionsService,
    private _jwtService: IJwtService,
    private _bcryptService: IHashService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<IAuthResponse> {
    try {
      const { password, ...data } = createUserDto;
      const hashedPassword = await this._encryptPassword(password);
      const user = this._repository.create({
        ...data,
        password: hashedPassword,
      });

      await this._repository.save(user);
      delete user.password;

      const token = await this._getJWT({ email: user.email, uid: user.id });

      return { user, token };
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async signIn(signInUserDto: SignInUserDto): Promise<IAuthResponse> {
    try {
      const { email, password } = signInUserDto;
      const user = await this._repository.findOneBy({ email });
      if (!user) {
        return this._exceptionsService.notFound({
          message: `The user with email ${email} could not be found`,
        });
      }

      // Compare encrypted passwords
      await this._comparePasswords(password, user.password);

      const token = await this._getJWT({ email: user.email, uid: user.id });

      return { user, token };
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async checkAuthStatus(user: IUser): Promise<IAuthResponse> {
    const token = await this._getJWT({ email: user.email, uid: user.id });
    return { user: { ...user }, token };
  }

  private async _getJWT(payload: IJwtPayload): Promise<string> {
    try {
      const token = await this._jwtService.signToken(payload);
      if (!token) {
        return this._exceptionsService.unauthorized({
          message: 'Could not generate a token',
        });
      }
      return token;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  private _encryptPassword(password: string): Promise<string> {
    return this._bcryptService.hash(password);
  }

  private async _comparePasswords(
    password: string,
    passwordDB: string,
  ): Promise<boolean> {
    try {
      const isValid = await this._bcryptService.compare(password, passwordDB);
      if (!isValid) {
        return this._exceptionsService.unauthorized({
          message: 'Invalid credentials',
        });
      }
      return isValid;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }
}
