import { Module } from '@nestjs/common';
import { AuthUseCases } from './application/use-cases/auth-use-cases';
import { AuthDatasourceModule } from './infrastructure/data/auth-datasource.module';
import { AuthController } from './interface-adapters/controllers/auth.controller';
import { EnvironmentConfigModule } from 'src/configuration/env/env-config.module';
import { PassportModule } from '@nestjs/passport';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [
    AuthDatasourceModule,
    EnvironmentConfigModule,
    PassportModule,
    CommonModule,
  ],
  providers: [AuthUseCases],
  controllers: [AuthController],
  exports: [PassportModule],
})
export class AuthModule {}
