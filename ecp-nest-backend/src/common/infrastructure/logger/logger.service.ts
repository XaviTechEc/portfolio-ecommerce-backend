import { Injectable, Logger } from '@nestjs/common';
import { ILogger } from 'src/common/domain/interfaces/logger/logger.interface';
import { EnvironmentConfigService } from 'src/configuration/env/env-config.service';

@Injectable()
export class MyLoggerService extends Logger implements ILogger {
  constructor(private environmentConfigService: EnvironmentConfigService) {
    super();
  }

  debug(context: string, message: string): void {
    if (this.environmentConfigService.getNodeEnv() !== 'production') {
      super.debug(`[DEBUG] ${message}`, context);
    }
  }
  log(context: unknown, message: unknown): void {
    super.log(`[INFO] ${message}}`, context);
  }
  warn(context: string, message: string): void {
    super.log(`[WARN] ${message}`, context);
  }
  error(context: string, message: string, stack?: string): void {
    super.error(`[ERROR] ${message}`, stack, context);
  }
  verbose(context: string, message: string): void {
    if (this.environmentConfigService.getNodeEnv() !== 'production')
      super.verbose(`[VERBOSE] ${message}`, context);
  }
}
