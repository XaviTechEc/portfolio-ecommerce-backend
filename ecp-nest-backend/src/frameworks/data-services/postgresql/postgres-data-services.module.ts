import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IDataSourcesService } from 'src/core/abstracts/services/data-sources.service';
import { PostgresDataServices } from './postgres-data-services.service';
import { UserEntity } from './typeorm/entities/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    {
      provide: IDataSourcesService,
      useClass: PostgresDataServices,
    },
  ],
  exports: [IDataSourcesService],
})
export class PostgresDataServiceModule {}
