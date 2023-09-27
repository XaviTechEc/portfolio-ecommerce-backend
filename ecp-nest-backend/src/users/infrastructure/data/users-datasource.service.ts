import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './postgresql/entities/User.entity';
import { UsersRepository } from './postgresql/repositories/users.repository';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { IUsersDataSourceService } from 'src/users/domain/abstracts/services/users-datasource.abstract.service';

@Injectable()
export class UsersDataService
  implements IUsersDataSourceService, OnApplicationBootstrap
{
  users: UsersRepository;

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private _loggerService: ILoggerService,
    private _exceptionsService: IExceptionsService,
  ) {}

  onApplicationBootstrap() {
    this.users = new UsersRepository(
      this.usersRepository,
      this._loggerService,
      this._exceptionsService,
    );
  }
}
