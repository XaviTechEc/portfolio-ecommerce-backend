import { Module } from '@nestjs/common';
import { IDataSourcesService } from 'src/common/domain/abstracts/services';
import { PostgresDataServices } from './postgres-data-services.service';

@Module({
  providers: [
    {
      provide: IDataSourcesService,
      useClass: PostgresDataServices,
    },
  ],
  exports: [IDataSourcesService],
})
export class PostgresDataServiceModule {}
