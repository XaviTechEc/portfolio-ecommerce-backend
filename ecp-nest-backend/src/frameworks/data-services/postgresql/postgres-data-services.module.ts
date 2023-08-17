import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IDataServices } from 'src/core/abstracts/services/data-sources.service';
import { User } from 'src/core/entities';
import { PostgresDataServices } from './postgres-data-services.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: IDataServices,
      useClass: PostgresDataServices,
    },
  ],
  exports: [IDataServices],
})
export class PostgresDataServiceModule {}
