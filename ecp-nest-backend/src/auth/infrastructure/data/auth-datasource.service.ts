import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IAuthRepository } from 'src/auth/domain/abstracts/repositories/auth.repository';
import { User } from 'src/users/infrastructure/data/postgresql/entities/User.entity';
import { Repository } from 'typeorm';
import { AuthRepository } from './postgresql/repositories/auth.repository';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { IAuthDataSourceService } from 'src/auth/domain/abstracts/services/auth-datasource.abstract.service';
import {
  IJwtService,
  IHashService,
} from 'src/common/domain/abstracts/services';
import { Role } from 'src/roles/infrastructure/data/postgresql/entities/Role.entity';

@Injectable()
export class AuthDataSourceService
  implements IAuthDataSourceService, OnApplicationBootstrap
{
  auth: IAuthRepository;

  constructor(
    @InjectRepository(User)
    private _repository: Repository<User>,
    @InjectRepository(Role)
    private _roleRepository: Repository<Role>,
    private _loggerService: ILoggerService,
    private _exceptionsService: IExceptionsService,
    private _jwtService: IJwtService,
    private _bcryptService: IHashService,
  ) {}

  onApplicationBootstrap() {
    // Auth
    this.auth = new AuthRepository(
      this._repository,
      this._roleRepository,
      this._loggerService,
      this._exceptionsService,
      this._jwtService,
      this._bcryptService,
    );
  }
}
