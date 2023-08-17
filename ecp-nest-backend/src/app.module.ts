import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { UserController } from './interface-adapters/controllers/users/user.controller';
import { DataServicesModule } from './services/data-services/data-services.module';
import { UserUseCasesModule } from './use-cases/users/user-use-cases.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    /**
     
     {
      envFilePath: ['.env.development'],
      load: [EnvConfiguration],
    }
     */
    CommonModule,
    DataServicesModule,
    UserUseCasesModule,
  ],
  controllers: [UserController],
  providers: [],
})
export class AppModule {}
