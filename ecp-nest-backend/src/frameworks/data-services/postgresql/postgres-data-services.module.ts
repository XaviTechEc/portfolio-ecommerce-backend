import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { PostgresDataServices } from './postgres-data-services.service';
import { User } from './typeorm/entities/outputs/entities';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: IDataSourcesService,
      useClass: PostgresDataServices,
    },
  ],
  exports: [IDataSourcesService],
})
export class PostgresDataServiceModule {}
