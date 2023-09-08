import { Module } from '@nestjs/common';

import { CommonModule } from './common/common.module';
import { DataServicesModule } from './services/data-services/data-services.module';

import { ConfigurationModule } from './configuration/configuration.module';
import { InterfaceAdaptersModule } from './interface-adapters/interface-adapters.module';
import { UseCasesModule } from './use-cases/use-cases.module';
import { FrameworksModule } from './frameworks/frameworks.module';
import { ExceptionModule } from './infrastructure/exceptions/exceptions.module';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { JwtModule } from './services/jwt/jwt.module';
import { HashingModule } from './services/hashing/hashing.module';
import { EncryptionModule } from './services/encryption/encryption.module';

@Module({
  imports: [
    CommonModule,
    ConfigurationModule,
    InterfaceAdaptersModule,
    DataServicesModule,
    JwtModule,
    HashingModule,
    EncryptionModule,
    UseCasesModule,
    FrameworksModule,
    ExceptionModule,
    LoggerModule,
  ],
})
export class AppModule {}
