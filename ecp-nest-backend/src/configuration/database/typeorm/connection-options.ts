import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvironmentConfigService } from 'src/configuration/env/env-config.service';

export const getTypeOrmModuleOptions = (
  envConfigService: EnvironmentConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: envConfigService.getDbHost(),
  port: envConfigService.getDbPort(),
  database: envConfigService.getDbName(),
  username: envConfigService.getDbUsername(),
  password: envConfigService.getDbPassword(),
  schema: envConfigService.getDataSchema(),
  // logging: true,
  autoLoadEntities: true,
  synchronize: true, //! TODO: Only dev mode
});
