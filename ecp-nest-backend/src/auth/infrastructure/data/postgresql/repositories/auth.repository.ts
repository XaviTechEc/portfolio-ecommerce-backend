import { Injectable } from '@nestjs/common';
import { IAuthRepository } from 'src/auth/domain/abstracts/repositories/auth.repository';
import { SignInUserDto } from 'src/auth/domain/dtos/rest/sign-in-user.dto';
import { IAuthResponse } from 'src/auth/domain/interfaces/auth-response.interface';
import { IJwtPayload } from 'src/common/domain/interfaces/jwt/jwt-payload.interface';
import { ExceptionsService } from 'src/common/infrastructure/exceptions/exceptions.service';
import { MyLoggerService } from 'src/common/infrastructure/logger/logger.service';
import { BcryptService } from 'src/common/infrastructure/services/hashing/bcrypt.service';
import { MyJwtService } from 'src/common/infrastructure/services/jwt/jwt.service';
import { CreateUserDto } from 'src/users/domain/dtos/rest/user.dto';
import { IUser } from 'src/users/domain/entities/user.entity';
import { User } from 'src/users/infrastructure/data/postgresql/entities/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthRepository implements IAuthRepository {
  private _repository: Repository<User>;
  private _loggerService: MyLoggerService;
  private _exceptionsService: ExceptionsService;

  constructor(
    repository: Repository<User>,
    loggerService: MyLoggerService,
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
