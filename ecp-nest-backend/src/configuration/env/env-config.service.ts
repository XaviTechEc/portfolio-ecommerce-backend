import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentConfigService {
  constructor(private configService: ConfigService) {}

  getNodeEnv(): string {
    return this.configService.get<string>('NODE_ENV');
  }

  getAppVersion(): string {
    return this.configService.get<string>('APP_VERSION');
  }

  getStage(): string {
    return this.configService.get<string>('STAGE');
  }

  getDbPassword(): string {
    return this.configService.get<string>('DB_PASSWORD');
  }

  getDbName(): string {
    return this.configService.get<string>('DB_NAME');
  }

  getDbHost(): string {
    return this.configService.get<string>('DB_HOST');
  }
  getDbPort(): number {
    return this.configService.get<number>('DB_PORT');
  }

  getDbUsername(): string {
    return this.configService.get<string>('DB_USERNAME');
  }

  getServerPort(): number {
    return this.configService.get<number>('SERVER_PORT');
  }

  getHostApi(): string {
    return this.configService.get<string>('HOST_API');
  }

  getDataSchema(): string {
    return this.configService.get<string>('DATA_SCHEMA');
  }

  // JWT
  getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }

  getJwtExpTime(): string {
    return this.configService.get<string>('JWT_EXPIRATION_TIME');
  }

  getJwtRefreshSecret(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET');
  }

  getJwtRefreshExpTime(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION_TIME');
  }
}
