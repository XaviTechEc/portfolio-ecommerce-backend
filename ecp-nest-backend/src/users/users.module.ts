import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './infrastructure/data/postgresql/entities/User.entity';
import { UserFactoryService } from './application/use-cases/factory/user-factory.service';
import { UserUseCases } from './application/use-cases/user-use-cases';
import { UserResolver } from './interface-adapters/resolvers/user.resolver';
import { UserController } from './interface-adapters/controllers/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserFactoryService, UserUseCases, UserResolver],
  controllers: [UserController],
  exports: [TypeOrmModule],
})
export class UsersModule {}
