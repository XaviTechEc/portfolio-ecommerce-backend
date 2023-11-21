import { Injectable } from '@nestjs/common';
import { IAuthRepository } from 'src/auth/domain/abstracts/repositories/auth.repository';
import { SignInUserDto } from 'src/auth/domain/dtos/rest/sign-in-user.dto';
import { IAuthResponse } from 'src/auth/domain/interfaces/auth-response.interface';
import { matchRoles } from 'src/auth/infrastructure/helpers/match-roles.helper';
import {
  IHashService,
  IJwtService,
} from 'src/common/domain/abstracts/services';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { IJwtPayload } from 'src/common/domain/interfaces/jwt/jwt-payload.interface';
import { RoleValue } from 'src/roles/domain/enums/role-value.enum';
import { Role } from 'src/roles/infrastructure/data/postgresql/entities/Role.entity';
import { CreateUserDto } from 'src/users/domain/dtos/rest/user.dto';
import { IUser } from 'src/users/domain/entities/user.entity';
import { User } from 'src/users/infrastructure/data/postgresql/entities/User.entity';
import { FindOptionsWhere, In, Repository } from 'typeorm';

const CONTEXT = 'AuthRepository';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(
    private _repository: Repository<User>,
    private _rolesRepository: Repository<Role>,
    private _loggerService: ILoggerService,
    private _exceptionsService: IExceptionsService,
    private _jwtService: IJwtService,
    private _bcryptService: IHashService,
  ) {}

  async googleLogin(user: IUser): Promise<IAuthResponse> {
    try {
      const { email, password = 'SomePassword@123', ...rest } = user; // TODO: Generate a secure password for google users
      const userDB = await this._repository.findOne({
        where: { email },
        relations: {
          roles: true,
        },
        select: {
          roles: {
            id: true,
            value: true,
          },
        },
      });
      // If user do not exists then register
      if (!userDB) {
        const hashedPassword = await this._encryptPassword(password);
        const newUser = this._repository.create({
          ...rest,
          email,
          password: hashedPassword,
        });

        await this._repository.save(newUser);

        const token = await this._getJWT({
          email: newUser.email,
          uid: newUser.id,
        });

        return {
          user: newUser,
          token,
        };
      }
      const token = await this._getJWT({
        email: userDB.email,
        uid: userDB.id,
      });
      return { user: userDB, token };
    } catch (error) {
      this._loggerService.error(
        CONTEXT,
        'Google sign in error, check console logs',
      );
      console.log(error);
      return { user: null, token: null };
    }
  }

  async register(createUserDto: CreateUserDto): Promise<IAuthResponse> {
    try {
      const { password, roles, ...data } = createUserDto;
      const hashedPassword = await this._encryptPassword(password);

      const where: FindOptionsWhere<Role> = roles
        ? { id: In(roles) }
        : { value: In([RoleValue.CLIENT]) };

      const rolesDB = await this._rolesRepository.find({
        where,
      });

      if (!rolesDB) {
        return this._exceptionsService.badRequest({
          message: `Given roles are not valid, it should match some of ${RoleValue}`,
        });
      }

      const user = this._repository.create({
        ...data,
        password: hashedPassword,
        roles: rolesDB,
      });

      const savedUser = await this._repository.save(user);
      delete savedUser.password;

      const token = await this._getJWT({ email: user.email, uid: user.id });

      return { user: savedUser, token };
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async signIn(signInUserDto: SignInUserDto): Promise<IAuthResponse> {
    try {
      const { email } = signInUserDto;
      const user = await this._repository.findOne({
        where: { email },
        relations: {
          roles: true,
        },
        select: {
          roles: {
            id: true,
            value: true,
          },
        },
      });
      const token = await this._getJWT({ uid: user.id, email: user.email });
      return { user, token };
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async checkAuthStatus(token: string): Promise<IAuthResponse> {
    try {
      if (!token) {
        return this._exceptionsService.unauthorized({
          message: 'No token provided',
        });
      }
      const decoded = await this._jwtService.verifyToken(token);
      const user = await this._repository.findOne({
        where: { email: decoded.email },
        relations: {
          roles: true,
        },
        select: {
          roles: {
            id: true,
            value: true,
          },
        },
      });
      return { user, token };
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async validateUserLocal(email: string, password: string): Promise<User> {
    try {
      const userFound = await this._repository.findOne({
        where: { email },
        relations: {
          roles: true,
        },
        select: {
          roles: {
            id: true,
            value: true,
          },
        },
      });

      if (!userFound) {
        return null;
      }
      const isValid = await this._comparePasswords(
        password,
        userFound.password,
      );

      if (!isValid) return null;

      delete userFound.password;
      return userFound;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async validateUserForJwtStrategy(id: string): Promise<IUser> {
    try {
      const userFound = await this._repository.findOne({
        where: { id },
        relations: {
          roles: true,
        },
        select: {
          roles: {
            id: true,
            value: true,
          },
        },
      });
      if (!userFound) {
        return this._exceptionsService.notFound({
          message: `The user with id ${id} could not be found`,
        });
      }

      delete userFound.password;
      return userFound;
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
  }

  async renewToken(token: string): Promise<IAuthResponse> {
    try {
      if (!token) {
        return this._exceptionsService.unauthorized({
          message: 'Invalid token',
        });
      }
      const decoded = await this._jwtService.verifyToken(token);
      const user = await this._repository.findOne({
        where: { email: decoded.email },
        relations: {
          roles: true,
        },
        select: {
          roles: {
            id: true,
            value: true,
          },
        },
      });
      const newToken = await this._getJWT({ uid: user.id, email: user.email });
      return { user, token: newToken };
    } catch (error) {
      this._exceptionsService.handler(error, CONTEXT);
    }
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
