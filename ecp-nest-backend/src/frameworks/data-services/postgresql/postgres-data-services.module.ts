import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IDataServices } from 'src/core/abstracts/services/data-sources.service';
import { PostgresDataServices } from './postgres-data-services.service';
import { UserEntity } from './typeorm/entities/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    {
      provide: IDataServices,
      useClass: PostgresDataServices,
    },
  ],
  exports: [IDataServices],
})
export class PostgresDataServiceModule {}
