import { Module } from '@nestjs/common';
import { AuthUseCases } from './application/use-cases/auth-use-cases';
import { AuthDatasourceModule } from './infrastructure/data/auth-datasource.module';
import { AuthController } from './interface-adapters/controllers/auth.controller';
import { EnvironmentConfigModule } from 'src/configuration/env/env-config.module';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/categories/infrastructure/guards/jwt-auth.guard';
import { UsersDataSourceModule } from 'src/users/infrastructure/data/users-datasource.module';

@Module({
  imports: [
    AuthDatasourceModule,
    UsersDataSourceModule,
    EnvironmentConfigModule,
    PassportModule,
  ],
  providers: [AuthUseCases, JwtAuthGuard],
  controllers: [AuthController],
  exports: [PassportModule, JwtAuthGuard],
})
export class AuthModule {}
