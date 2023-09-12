import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './postgresql/entities/User.entity';
import { UsersRepository } from './postgresql/repositories/users.repository';
import { ExceptionsService } from 'src/common/infrastructure/exceptions/exceptions.service';
import { MyLoggerService } from 'src/common/infrastructure/logger/logger.service';
import { IUsersDataSourceService } from 'src/users/domain/abstracts/services/users-datasource.abstract.service';

@Injectable()
export class UsersDataService
  implements IUsersDataSourceService, OnApplicationBootstrap
{
  users: UsersRepository;

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private _loggerService: MyLoggerService,
    private _exceptionsService: ExceptionsService,
  ) {}

  onApplicationBootstrap() {
    this.users = new UsersRepository(
      this.usersRepository,
      this._loggerService,
      this._exceptionsService,
    );
  }
}
