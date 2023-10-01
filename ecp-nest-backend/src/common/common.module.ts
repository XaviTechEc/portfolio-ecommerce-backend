import { Global, Module } from '@nestjs/common';
import { JwtModule as JwtM } from '@nestjs/jwt';
import { EnvironmentConfigModule } from 'src/configuration/env/env-config.module';
import { EnvironmentConfigService } from 'src/configuration/env/env-config.service';
import { ExceptionsService } from './infrastructure/services/exceptions/exceptions.service';
import { MyLoggerService } from './infrastructure/services/logger/logger.service';
import { CryptoService } from './infrastructure/services/encryption/crypto.service';
import { BcryptService } from './infrastructure/services/hashing/bcrypt.service';
import { MyJwtService } from './infrastructure/services/jwt/jwt.service';
import {
  IEncryptService,
  IHashService,
  IJwtService,
} from './domain/abstracts/services';
import { ILoggerService } from './domain/abstracts/services/logger/logger.abstract.service';
import { IExceptionsService } from './domain/abstracts/services/exceptions/exceptions.abstract.service';

@Global()
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
  providers: [
    {
      provide: ILoggerService,
      useClass: MyLoggerService,
    },
    {
      provide: IExceptionsService,
      useClass: ExceptionsService,
    },
    {
      provide: IHashService,
      useClass: BcryptService,
    },
    {
      provide: IEncryptService,
      useClass: CryptoService,
    },
    {
      provide: IJwtService,
      useClass: MyJwtService,
    },
  ],
  exports: [
    ILoggerService,
    IExceptionsService,
    IHashService,
    IEncryptService,
    IJwtService,
  ],
})
export class CommonModule {}
