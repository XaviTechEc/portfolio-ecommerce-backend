import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { EnvironmentConfigModule } from 'src/configuration/env/env-config.module';

@Module({
  imports: [EnvironmentConfigModule],
  exports: [LoggerService],
  providers: [LoggerService],
})
export class LoggerModule {}
