import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IGenericDataMethodsRepository } from 'src/core/abstracts/repositories/generic-data-methods.repository';
import { IDataServices } from 'src/core/abstracts/services/data-sources.service';
import { User } from 'src/core/entities';
import { Repository } from 'typeorm';
import { PostgresGenericRepository } from './postgres-generic-repository';

@Injectable()
export class PostgresDataServices
  implements IDataServices, OnApplicationBootstrap
{
  users: IGenericDataMethodsRepository<User>;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    console.log('====================================');
    console.log(process.env.DB_HOST);
    console.log('====================================');
  }

  onApplicationBootstrap() {
    this.users = new PostgresGenericRepository<User>(this.userRepository);
  }
}
