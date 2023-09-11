import { Module } from '@nestjs/common';
import { PostgresDataServiceModule } from 'src/frameworks/data-services/postgresql/postgres-data-services.module';

@Module({
  imports: [PostgresDataServiceModule],
  exports: [PostgresDataServiceModule],
})
export class DataServicesModule {}