import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CommonModule } from './common/common.module';
import { UserController } from './interface-adapters/controllers/users/user.controller';
import { DataServicesModule } from './services/data-services/data-services.module';
import { UserUseCasesModule } from './use-cases/users/user-use-cases.module';
// import { EnvConfiguration } from './configuration/env/env,config';
import { AppController } from './app/app.controller';
import { ConfigurationModule } from './configuration/configuration.module';
import { AppService } from './app/app.service';

@Module({
  imports: [
    /*
      {
        envFilePath: ['.env.development'],
        load: [EnvConfiguration],
      }
    */
    ConfigModule.forRoot(),
    ConfigurationModule,
    CommonModule,
    DataServicesModule,
    UserUseCasesModule,
  ],
  controllers: [UserController, AppController],
  providers: [AppService],
})
export class AppModule {}
