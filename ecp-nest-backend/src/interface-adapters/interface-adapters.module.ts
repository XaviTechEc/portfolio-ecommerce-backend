import { Module } from '@nestjs/common';
import { UseCasesModule } from 'src/use-cases/use-cases.module';
import { AddressResolver } from './resolvers/addresses/address.resolver';

@Module({
  imports: [UseCasesModule],
  controllers: [],
  providers: [AddressResolver],
})
export class InterfaceAdaptersModule {}
