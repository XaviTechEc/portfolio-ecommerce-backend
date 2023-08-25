import { Module } from '@nestjs/common';
import { UserUseCasesModule } from './users/user-use-cases.module';
import { AddressesUseCaseModule } from './addresses/addresses-use-cases.module';
import { CartUseCasesModule } from './cart/cart-use-cases.module';

@Module({
  imports: [UserUseCasesModule, AddressesUseCaseModule, CartUseCasesModule],
  exports: [UserUseCasesModule, AddressesUseCaseModule, CartUseCasesModule],
})
export class UseCasesModule {}
