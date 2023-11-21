import { OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { IRolesDataSourceService } from 'src/roles/domain/abstracts/services/roles-datasource.abstract.service';
import { Repository } from 'typeorm';
import { Role } from './postgresql/entities/Role.entity';
import { RolesPostgresRepository } from './postgresql/repositories/roles.repository';

export class RolesDataService
  implements IRolesDataSourceService, OnApplicationBootstrap
{
  roles: RolesPostgresRepository<Role>;

  constructor(
    @InjectRepository(Role)
    private _repository: Repository<Role>,
    private _loggerService: ILoggerService,
    private _exceptionsService: IExceptionsService,
  ) {}

  onApplicationBootstrap() {
    this.roles = new RolesPostgresRepository<Role>(
      this._repository,
      this._loggerService,
      this._exceptionsService,
      this.constructor.name,
      'role',
    );
  }
}
