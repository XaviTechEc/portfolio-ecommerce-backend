import { Module } from '@nestjs/common';
import { UserUseCasesModule } from './users/user-use-cases.module';
import { AddressesUseCaseModule } from './addresses/addresses-use-cases.module';

@Module({
  imports: [UserUseCasesModule, AddressesUseCaseModule],
  exports: [UserUseCasesModule, AddressesUseCaseModule],
})
export class UseCasesModule {}
