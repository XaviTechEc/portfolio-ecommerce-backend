import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';

import { Repository } from 'typeorm';
import { PostgresGenericRepository } from './postgres-generic-repository';
import { User } from './typeorm/entities/users/user.entity';

@Injectable()
export class PostgresDataServices
  implements IDataSourcesService, OnApplicationBootstrap
{
  users: PostgresGenericRepository<User>;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  onApplicationBootstrap() {
    this.users = new PostgresGenericRepository<User>(this.userRepository);
  }
}
