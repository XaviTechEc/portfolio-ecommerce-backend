import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IAuthRepository } from 'src/auth/domain/abstracts/repositories/auth.repository';
import { User } from 'src/users/infrastructure/data/postgresql/entities/User.entity';
import { Repository } from 'typeorm';
import { AuthRepository } from './postgresql/repositories/auth.repository';
import { ExceptionsService } from 'src/common/infrastructure/exceptions/exceptions.service';
import { MyLoggerService } from 'src/common/infrastructure/logger/logger.service';
import { IAuthDataSourceService } from 'src/auth/domain/abstracts/services/auth-datasource.abstract.service';

@Injectable()
export class AuthDataSourceService
  implements IAuthDataSourceService, OnApplicationBootstrap
{
  auth: IAuthRepository;

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private _loggerService: MyLoggerService,
    private _exceptionsService: ExceptionsService,
  ) {}

  onApplicationBootstrap() {
    // Auth
    this.auth = new AuthRepository(
      this.usersRepository,
      this._loggerService,
      this._exceptionsService,
    );
  }
}
