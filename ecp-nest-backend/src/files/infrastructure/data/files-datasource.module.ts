import { Module } from '@nestjs/common';
import { IFilesDataSourceService } from 'src/files/domain/abstracts/files-datasource.abstract.service';
import { FilesDataService } from './files-datasource.service';
import { EnvironmentConfigModule } from 'src/configuration/env/env-config.module';

@Module({
  imports: [EnvironmentConfigModule],
  providers: [
    {
      provide: IFilesDataSourceService,
      useClass: FilesDataService,
    },
  ],
  exports: [IFilesDataSourceService],
})
export class FilesDataSourceModule {}
