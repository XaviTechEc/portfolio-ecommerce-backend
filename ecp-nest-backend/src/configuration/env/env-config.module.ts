import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env-config.validations';
import { EnvironmentConfigService } from './env-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './development.env',
      isGlobal: true,
      validate,
    }),
  ],
  providers: [EnvironmentConfigService],
  exports: [EnvironmentConfigService],
})
export class EnvironmentConfigModule {}
