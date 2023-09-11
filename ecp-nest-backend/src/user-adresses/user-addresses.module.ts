import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAddress } from './infrastructure/data/postgresql/entities/UserAddress.entity';
import { UserAddressFactoryService } from './application/use-cases/factory/user-address-factory.service';
import { UserAddressUseCases } from './application/use-cases/user-address-use-case';
import { UserAddressResolver } from './interface-adapters/resolvers/user-address.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([UserAddress])],
  providers: [
    UserAddressFactoryService,
    UserAddressUseCases,
    UserAddressResolver,
  ],
  exports: [TypeOrmModule],
})
export class UserAddressesModule {}
