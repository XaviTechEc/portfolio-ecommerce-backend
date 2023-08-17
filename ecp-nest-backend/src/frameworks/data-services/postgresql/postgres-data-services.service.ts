import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { IDataServices } from 'src/core/abstracts/services/data-sources.service';

import { Repository } from 'typeorm';
import { PostgresGenericRepository } from './postgres-generic-repository';
import { UserEntity } from './typeorm/entities/users/user.entity';

@Injectable()
export class PostgresDataServices
  implements IDataServices, OnApplicationBootstrap
{
  users: PostgresGenericRepository<UserEntity>;

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  onApplicationBootstrap() {
    this.users = new PostgresGenericRepository<UserEntity>(this.userRepository);
  }
}
