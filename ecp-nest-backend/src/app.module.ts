import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvConfiguration } from './configuration/env/env,config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      load: [EnvConfiguration],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
