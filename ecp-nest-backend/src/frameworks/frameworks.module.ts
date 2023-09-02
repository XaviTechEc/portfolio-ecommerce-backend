import { Module } from '@nestjs/common';
import { PostgresDataServiceModule } from './data-services/postgresql/postgres-data-services.module';

@Module({
  imports: [PostgresDataServiceModule],
  exports: [PostgresDataServiceModule],
})
export class FrameworksModule {}
