import { Module } from '@nestjs/common';
import { TypeOrmConfigModule } from './database/typeorm/typeorm-config.module';
import { EnvironmentConfigModule } from './env/env-config.module';

@Module({
  imports: [TypeOrmConfigModule, EnvironmentConfigModule],
  exports: [TypeOrmConfigModule, EnvironmentConfigModule],
})
export class ConfigurationModule {}
