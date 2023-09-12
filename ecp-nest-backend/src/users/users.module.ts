import { Module } from '@nestjs/common';
import { UserFactoryService } from './application/use-cases/factory/user-factory.service';
import { UserUseCases } from './application/use-cases/user-use-cases';
import { UsersDataSourceModule } from './infrastructure/data/users-datasource.module';
import { UserController } from './interface-adapters/controllers/user.controller';
import { UserResolver } from './interface-adapters/resolvers/user.resolver';
import { UserAddressesModule } from 'src/user-addresses/user-addresses.module';
import { UserPaymentMethodsModule } from 'src/user-payment-methods/user-payment-methods.module';

@Module({
  imports: [
    UsersDataSourceModule,
    UserAddressesModule,
    UserPaymentMethodsModule,
  ],
  providers: [UserFactoryService, UserUseCases, UserResolver],
  controllers: [UserController],
})
export class UsersModule {}
