import { Module } from '@nestjs/common';

import { CommonModule } from './common/common.module';
import { DataServicesModule } from './services/data-services/data-services.module';

import { ConfigurationModule } from './configuration/configuration.module';
import { InterfaceAdaptersModule } from './interface-adapters/interface-adapters.module';
import { UseCasesModule } from './use-cases/use-cases.module';
import { FrameworksModule } from './frameworks/frameworks.module';
import { ExceptionModule } from './infrastructure/exceptions/exceptions.module';
import { LoggerModule } from './infrastructure/logger/logger.module';

@Module({
  imports: [
    CommonModule,
    ConfigurationModule,
    InterfaceAdaptersModule,
    DataServicesModule,
    UseCasesModule,
    FrameworksModule,
    ExceptionModule,
    LoggerModule,
  ],
  providers: [],
})
export class AppModule {}
