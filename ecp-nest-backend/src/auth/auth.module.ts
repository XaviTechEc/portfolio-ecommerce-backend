import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { EnvironmentConfigModule } from 'src/configuration/env/env-config.module';
import { UsersDataSourceModule } from 'src/users/infrastructure/data/users-datasource.module';
import { AuthUseCases } from './application/use-cases/auth-use-cases';
import { AuthDatasourceModule } from './infrastructure/data/auth-datasource.module';
import { GqlAuthGuard } from './infrastructure/guards/gql-auth.guard';
import { UserRolesGqlGuard } from './infrastructure/guards/user-role-gql.guard';
import { UserRolesGuard } from './infrastructure/guards/user-role.guard';
import { AuthController } from './interface-adapters/controllers/auth.controller';
import { JwtAuthGuard } from './infrastructure/guards/jwt-auth.guard';
import { JwtStrategy } from './infrastructure/passport/strategies/jwt.strategy';

@Module({
  imports: [
    AuthDatasourceModule,
    UsersDataSourceModule,
    EnvironmentConfigModule,
    PassportModule,
  ],
  providers: [
    AuthUseCases,
    JwtAuthGuard,
    GqlAuthGuard,
    UserRolesGqlGuard,
    UserRolesGuard,
    JwtStrategy,
  ],
  controllers: [AuthController],
  exports: [
    PassportModule,
    JwtAuthGuard,
    GqlAuthGuard,
    UserRolesGqlGuard,
    UserRolesGuard,
    JwtStrategy,
  ],
})
export class AuthModule {}
