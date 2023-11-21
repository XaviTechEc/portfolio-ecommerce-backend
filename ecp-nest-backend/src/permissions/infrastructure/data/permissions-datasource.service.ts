import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { IPermissionsDataSourceService } from 'src/permissions/domain/abstracts/services/permissions-datasource.abstract.service';
import { Repository } from 'typeorm';
import { Permission } from './postgresql/entities/Permission.entity';
import { PermissionsPostgresRepository } from './postgresql/repositories/permissions.repository';

@Injectable()
export class PermissionsDataService
  implements IPermissionsDataSourceService, OnApplicationBootstrap
{
  permissions: PermissionsPostgresRepository<Permission>;

  constructor(
    @InjectRepository(Permission)
    private _repository: Repository<Permission>,
    private _loggerService: ILoggerService,
    private _exceptionsService: IExceptionsService,
  ) {}

  onApplicationBootstrap() {
    this.permissions = new PermissionsPostgresRepository<Permission>(
      this._repository,
      this._loggerService,
      this._exceptionsService,
      this.constructor.name,
      'permission',
    );
  }
}
