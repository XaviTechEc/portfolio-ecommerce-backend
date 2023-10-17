import * as fs from 'fs';
import { join } from 'path';
import { IExceptionsService } from 'src/common/domain/abstracts/services/exceptions/exceptions.abstract.service';
import { ILoggerService } from 'src/common/domain/abstracts/services/logger/logger.abstract.service';
import { IFileRepository } from 'src/files/domain/abstracts/file.repository';
import { ValidFileDestination } from 'src/files/domain/interfaces/valid-file-destination.type';
import { EnvironmentConfigService } from '../../../../configuration/env/env-config.service';

export class StaticFilesRepository
  implements IFileRepository<Express.Multer.File>
{
  constructor(
    private _exceptionsService: IExceptionsService,
    private _loggerService: ILoggerService,
    private environmentConfigService: EnvironmentConfigService,
  ) {}

  save(
    file: Express.Multer.File,
    destination: ValidFileDestination,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject(
          this._exceptionsService.badRequest({
            message: 'File is required',
          }),
        );
      }

      const secureUrl = `${this.environmentConfigService.getHostApi()}/files/${destination}/${
        file.filename
      }`;

      resolve(secureUrl);
    });
  }

  findByName(name: string, destination: ValidFileDestination): Promise<string> {
    return new Promise((resolve, reject) => {
      const path = join(
        __dirname,
        `../../../../../static/${destination}`,
        name,
      );

      try {
        if (!fs.existsSync(path)) {
          reject(
            this._exceptionsService.notFound({ message: 'File not found' }),
          );
        }

        resolve(path);
      } catch (error) {
        reject(error);
      }
    });
  }

  remove(name: string, destination: ValidFileDestination): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const path = join(
        __dirname,
        `../../../../../static/${destination}`,
        name,
      );

      try {
        if (!fs.existsSync(path)) {
          reject(
            this._exceptionsService.notFound({ message: 'File not found' }),
          );
        }

        fs.unlinkSync(path);
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }

  findAll(): Promise<Express.Multer.File[]> {
    throw new Error('Method not implemented.');
  }
}
