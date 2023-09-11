import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentMethod } from './infrastructure/data/postgresql/entities/PaymentMethod.entity';
import { PaymentMethodFactoryService } from './application/use-cases/factory/payment-method-factory.service';
import { PaymentMethodUseCases } from './application/use-cases/payment-method-use-cases';
import { PaymentMethodResolver } from './interface-adapters/resolvers/payment-method.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentMethod])],
  providers: [
    PaymentMethodFactoryService,
    PaymentMethodUseCases,
    PaymentMethodResolver,
  ],
  exports: [TypeOrmModule],
})
export class PaymentMethodsModule {}
