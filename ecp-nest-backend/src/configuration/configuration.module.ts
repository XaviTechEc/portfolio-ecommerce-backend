import { Module } from '@nestjs/common';
import { TypeOrmConfigModule } from './database/typeorm/typeorm-config.module';
import { EnvironmentConfigModule } from './env/env-config.module';
import { GraphqlConfigModule } from './graphql/graphql-config.module';

@Module({
  imports: [TypeOrmConfigModule, EnvironmentConfigModule, GraphqlConfigModule],
  exports: [TypeOrmConfigModule, EnvironmentConfigModule, GraphqlConfigModule],
})
export class ConfigurationModule {}
