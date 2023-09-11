import { Module } from '@nestjs/common';
import { AuthUseCases } from './application/use-cases/auth-use-cases';
import { AuthController } from './interface-adapters/controllers/auth.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  providers: [AuthUseCases],
  controllers: [AuthController],
})
export class AuthModule {}
