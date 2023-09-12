import { Module } from '@nestjs/common';
import { JwtModule as JwtM } from '@nestjs/jwt';
import { EnvironmentConfigModule } from 'src/configuration/env/env-config.module';
import { EnvironmentConfigService } from 'src/configuration/env/env-config.service';
import { ExceptionsService } from './infrastructure/exceptions/exceptions.service';
import { MyLoggerService } from './infrastructure/logger/logger.service';
import { CryptoService } from './infrastructure/services/encryption/crypto.service';
import { BcryptService } from './infrastructure/services/hashing/bcrypt.service';

@Module({
  imports: [
    EnvironmentConfigModule,
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
  exports: [MyLoggerService, ExceptionsService, CryptoService, BcryptService],
})
export class CommonModule {}
