import { Module } from '@nestjs/common';
import { AuthUseCases } from './application/use-cases/auth-use-cases';
import { AuthDatasourceModule } from './infrastructure/data/auth-datasource.module';
import { AuthController } from './interface-adapters/controllers/auth.controller';

@Module({
  imports: [AuthDatasourceModule],
  providers: [AuthUseCases],
  controllers: [AuthController],
})
export class AuthModule {}
