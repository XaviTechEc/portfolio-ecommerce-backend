import { Module } from '@nestjs/common';
import { PostgresDataServiceModule } from './data-services/postgresql/postgres-data-services.module';
import { MyGraphqlModule } from './graphql/graphql.module';

@Module({
  imports: [PostgresDataServiceModule, MyGraphqlModule],
  exports: [PostgresDataServiceModule, MyGraphqlModule],
})
export class FrameworksModule {}
