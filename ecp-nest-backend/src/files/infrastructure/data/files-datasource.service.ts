import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { IFileRepository } from 'src/files/domain/abstracts/file.repository';
import { IFilesDataSourceService } from 'src/files/domain/abstracts/files-datasource.abstract.service';
import { validDestinations } from 'src/files/domain/constants/valid-destinations.constant';
import { EnvironmentConfigService } from '../../../configuration/env/env-config.service';
import { StaticFilesRepository } from './static/static-files.repository';

import * as fs from 'fs';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';

@Injectable()
export class FilesDataService
  implements
    IFilesDataSourceService<Express.Multer.File>,
    OnApplicationBootstrap
{
  files: IFileRepository<Express.Multer.File>;

  constructor(
    private _exceptionsService: IExceptionsService,
    private _loggerService: ILoggerService,
    private _environmentConfigService: EnvironmentConfigService,
  ) {}

  onApplicationBootstrap() {
    this.checkIfPathExistsOrCreate();

    this.files = new StaticFilesRepository(
      this._exceptionsService,
      this._loggerService,
      this._environmentConfigService,
    );
  }

  private checkIfPathExistsOrCreate(): void {
    try {
      for (const destination of validDestinations) {
        const directory = `./static/${destination}`;
        const pathExists = fs.existsSync(directory);
        if (!pathExists) {
          fs.mkdirSync(directory, { recursive: true });
        }
      }
    } catch (error) {
      this._loggerService.error('FilesDataService', error);
    }
  }
}
