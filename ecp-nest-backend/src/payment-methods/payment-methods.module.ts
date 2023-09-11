import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentMethodFactoryService } from './application/use-cases/factory/payment-method-factory.service';
import { PaymentMethodUseCases } from './application/use-cases/payment-method-use-cases';
import { PaymentMethodsDataSourceModule } from './infrastructure/data/payment-methods-datasource.module';
import { PaymentMethodResolver } from './interface-adapters/resolvers/payment-method.resolver';

@Module({
  imports: [PaymentMethodsDataSourceModule],
  providers: [
    PaymentMethodFactoryService,
    PaymentMethodUseCases,
    PaymentMethodResolver,
  ],
  exports: [TypeOrmModule],
})
export class PaymentMethodsModule {}
