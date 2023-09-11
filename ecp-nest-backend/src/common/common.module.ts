import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from 'src/configuration/env/env-config.module';
import { JwtModule as JwtM } from '@nestjs/jwt';
import { EnvironmentConfigService } from 'src/configuration/env/env-config.service';
import { MyLoggerService } from './infrastructure/logger/logger.service';
import { ExceptionsService } from './infrastructure/exceptions/exceptions.service';
import { DataServicesModule } from './infrastructure/services/data-services/data-services.module';
import { CryptoService } from './infrastructure/services/encryption/crypto.service';
import { BcryptService } from './infrastructure/services/hashing/bcrypt.service';
import { PostgresDataServiceModule } from './frameworks/data-services/postgresql/postgres-data-services.module';

@Module({
  imports: [
    EnvironmentConfigModule,
    DataServicesModule,
    PostgresDataServiceModule,
    JwtM.registerAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: (envConfigService: EnvironmentConfigService) => {
        const secret = envConfigService.getJwtSecret();
        const expiresIn = envConfigService.getJwtExpTime();
        return {
          secret,
          signOptions: {
            expiresIn,
          },
        };
      },
    }),
  ],
  providers: [MyLoggerService, ExceptionsService, CryptoService, BcryptService],
  exports: [
    DataServicesModule,
    PostgresDataServiceModule,
    MyLoggerService,
    ExceptionsService,
    CryptoService,
    BcryptService,
  ],
})
export class CommonModule {}
