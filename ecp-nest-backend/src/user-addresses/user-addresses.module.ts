import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAddressFactoryService } from './application/use-cases/factory/user-address-factory.service';
import { UserAddressUseCases } from './application/use-cases/user-address-use-case';
import { UserAddressesDataSourceModule } from './infrastructure/data/user-addresses-datasource.module';
import { UserAddressResolver } from './interface-adapters/resolvers/user-address.resolver';

@Module({
  imports: [UserAddressesDataSourceModule],
  providers: [
    UserAddressFactoryService,
    UserAddressUseCases,
    UserAddressResolver,
  ],
  exports: [TypeOrmModule],
})
export class UserAddressesModule {}
