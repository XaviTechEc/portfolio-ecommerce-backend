import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFactoryService } from './application/use-cases/factory/user-factory.service';
import { UserUseCases } from './application/use-cases/user-use-cases';
import { UsersDataSourceModule } from './infrastructure/data/users-datasource.module';
import { UserController } from './interface-adapters/controllers/user.controller';
import { UserResolver } from './interface-adapters/resolvers/user.resolver';

@Module({
  imports: [UsersDataSourceModule],
  providers: [UserFactoryService, UserUseCases, UserResolver],
  controllers: [UserController],
  exports: [TypeOrmModule],
})
export class UsersModule {}
