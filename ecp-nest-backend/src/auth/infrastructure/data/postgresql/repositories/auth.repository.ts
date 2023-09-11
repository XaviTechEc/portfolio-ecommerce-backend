import { IAuthRepository } from 'src/core/abstracts/repositories';
import { SignInUserDto, CreateUserDto } from 'src/core/dtos';
import { IUser } from 'src/core/entities';
import { IAuthResponse } from 'src/core/interfaces/auth/auth-response.interface';
import { User } from '../../entities/outputs/entities';
import { LoggerService, Injectable } from '@nestjs/common';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';
import { Repository } from 'typeorm';
import { IJwtPayload } from 'src/core/interfaces/strategies/jwt/jwt-payload.interface';
import { MyJwtService } from 'src/services/jwt/jwt.service';
import { BcryptService } from 'src/services/hashing/bcrypt.service';

@Injectable()
export class AuthRepository implements IAuthRepository {
  private _repository: Repository<User>;
  private _loggerService: LoggerService;
  private _exceptionsService: ExceptionsService;

  constructor(
    repository: Repository<User>,
    loggerService: LoggerService,
    exceptionsService: ExceptionsService,
    private readonly _jwtService?: MyJwtService,
    private readonly _bcryptService?: BcryptService,
  ) {
    this._repository = repository;
    this._loggerService = loggerService;
    this._exceptionsService = exceptionsService;
  }
  async register(createUserDto: CreateUserDto): Promise<IAuthResponse> {
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
  }

  async signIn(signInUserDto: SignInUserDto): Promise<IAuthResponse> {
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
  }

  async checkAuthStatus(user: IUser): Promise<IAuthResponse> {
    const token = await this._getJWT({ email: user.email, uid: user.id });
    return { user: { ...user }, token };
  }

  private _encryptPassword(password: string): Promise<string> {
    return this._bcryptService.hash(password);
  }

  private async _getJWT(payload: IJwtPayload): Promise<string> {
    const token = await this._jwtService.signToken(payload);
    if (!token) {
      return this._exceptionsService.unauthorized({
        message: 'Could not generate a token',
      });
    }
    return token;
  }

  private async _comparePasswords(
    password: string,
    passwordDB: string,
  ): Promise<boolean> {
    const isValid = await this._bcryptService.compare(password, passwordDB);
    if (!isValid) {
      return this._exceptionsService.unauthorized({
        message: 'Invalid credentials',
      });
    }
    return isValid;
  }
}