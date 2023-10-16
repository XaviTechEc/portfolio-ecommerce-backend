import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { EnvironmentConfigModule } from 'src/configuration/env/env-config.module';
import { AuthUseCases } from './application/use-cases/auth-use-cases';
import { AuthDatasourceModule } from './infrastructure/data/auth-datasource.module';
import { GqlAuthGuard } from './infrastructure/guards/gql-auth.guard';
import { UserRolesGuard } from './infrastructure/guards/user-role.guard';
import { AuthController } from './interface-adapters/controllers/auth.controller';
import { JwtAuthGuard } from './infrastructure/guards/jwt-auth.guard';
import { JwtStrategy } from './infrastructure/passport/strategies/jwt.strategy';
import { GlobalJWTAuthGuard } from './infrastructure/guards/global-auth.guard';
import { GoogleStrategy } from './infrastructure/passport/strategies/google.strategy';
import { GoogleOAuthGuard } from './infrastructure/guards/google-auth.guard';
import { UsersModule } from 'src/users/users.module';

// @Global()
@Module({
  imports: [
    AuthDatasourceModule,
    UsersModule,
    EnvironmentConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt', session: true }),
  ],
  providers: [
    AuthUseCases,
    GlobalJWTAuthGuard,
    GqlAuthGuard,
    JwtAuthGuard,
    UserRolesGuard,
    JwtStrategy,
    GoogleStrategy,
    GoogleOAuthGuard,
  ],
  controllers: [AuthController],
  exports: [
    PassportModule,
    GlobalJWTAuthGuard,
    GqlAuthGuard,
    JwtAuthGuard,
    UserRolesGuard,
    JwtStrategy,
    GoogleStrategy,
    GoogleOAuthGuard,
  ],
})
export class AuthModule {}
